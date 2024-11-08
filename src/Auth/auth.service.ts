import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LoginDto, SignUpDto } from './dto/auth.dto';
import { account_type, Prisma, user } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { InvalidPasswordError, InvalidTokenError, StoreAccessTokenError } from 'src/utils/errors';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  private readonly SECRET_KEY: string = process.env.SECRET_KEY;
  async signUp(reqBody: SignUpDto) {
    try {
      const passwordHash = await this.hashPassword(reqBody.password);
      const [user] = await this.prismaService.$transaction([
        this.prismaService.user.create({
          data: {
            email: reqBody.email,
            full_name: reqBody.full_name,
            account_type: reqBody?.account_type || account_type.Regular,
            password: {
              create: {
                password_hash: passwordHash,
              },
            },
            profile: {
              create: {
                bio: '',
                avatar_url: '',
              },
            },
          },
        }),
      ]);
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          error.message = 'Email already exist';
          error['_status'] = 400;
        }
      }
      throw error;
    }
  }

  async login(reqBody: LoginDto) {
    try {
      // Step 1: find user
      let { password, ...user } =
        await this.prismaService.user.findUniqueOrThrow({
          where: {
            email: reqBody.email,
          },
          include: {
            password: true,
          },
        });
      // Step 2: Confirm password
      let passwordValid = await this.comparePassword(
        reqBody.password,
        password.password_hash,
      );
      if (!passwordValid) throw new InvalidPasswordError('Invalid password');
      const token = this.generateAccessToken({
        id: user.user_id,
        updated_at: user.updated_at?.toISOString(),
      });
      this.storeAccessToken(token, user.user_id).catch((error) => {
        throw new StoreAccessTokenError(error);
      });
      return [token, user];
    } catch (error) {
      if (
        (error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code == 'P2025') ||
        error instanceof InvalidPasswordError
      ) {
        error.message = 'User Not Found';
        error['_status'] = 400;
      }
      throw error;
    }
  }

  async logout(currentUser: user) {
    try {
     return await this.prismaService.access_token.delete({
        where: {
          user_id: currentUser.user_id
        }
      })
    } catch (error) {
      throw error
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
  }

  private async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await compare(password, hashedPassword);
  }

  private generateAccessToken(payload: {
    id: string;
    updated_at: string | null;
  }): string {
    return sign(payload, this.SECRET_KEY, {
      expiresIn: Math.floor(Date.now() / 1000) + 2,
      // expiresIn: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365)
    });
  }

  async validateTokenAndGetCurrentUser(token: string): Promise<user> {
    try {
      let decodedPayload: string | JwtPayload = verify(token, this.SECRET_KEY);
      if (typeof decodedPayload != 'string') {
        const { access_token, ...user } =
          await this.prismaService.user.findUniqueOrThrow({
            where: {
              user_id: decodedPayload.id,
            },
            include: {
              access_token: true,
            },
          });
        if (access_token.access_token == token) {
          return user;
        }
        throw new InvalidTokenError('Invalid Token');
      }
      throw new Error(decodedPayload);
    } catch (error) {
      throw error;
    }
  }

  private async storeAccessToken(token: string, userID: string) {
    let accessTokenObject = await this.prismaService.access_token.findUnique({
      where: {
        user_id: userID,
      },
    });
    if (accessTokenObject) {
      return await this.prismaService.access_token.update({
        where: {
          access_token_id: accessTokenObject.access_token_id,
        },
        data: {
          access_token: token,
        },
      });
    }
    return await this.prismaService.access_token.create({
      data: {
        user_id: userID,
        access_token: token,
      },
    });
  }
}
