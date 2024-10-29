import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ErrorResponse, SuccessResponse } from 'src/utils/response';
import { LoginDto, SignUpDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class Auth {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async register(
    @Body() reqBody: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      let user = await this.authService.signUp(reqBody);
      return SuccessResponse('Account created successfully', user);
    } catch (error) {
      res.status(error._status || 500).json(ErrorResponse(error.message));
    }
  }

  @Post('/login')
  async login(
    @Body() reqBody: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      let [token, user] = await this.authService.login(reqBody);
      return SuccessResponse('Login successful', { access_token: token, user });
    } catch (error) {
      if (error.message && error.message == 'User Not Found') {
        return res
          .status(error._status)
          .json(ErrorResponse('Invalid credentials'));
      }
      res.status(500).json(ErrorResponse('Internal Server Error'));
    }
  }
  @Post('/logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    try {
      await this.authService.logout(req.$currentUser);

      return SuccessResponse('Logout successful');
    } catch (error) {
      res.status(500).json(ErrorResponse('Internal Server Error'));
    }
  }
}
