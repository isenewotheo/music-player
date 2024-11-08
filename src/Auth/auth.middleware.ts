import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from 'src/utils/response';
import { AuthService } from './auth.service';
import { user } from '@prisma/client';
import { TokenExpiredError,  } from 'jsonwebtoken';
import { InvalidTokenError } from 'src/utils/errors';

@Injectable()
export class AuthGuardMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      let authorization = req.headers.authorization;
      if (authorization && authorization.includes('Bearer')) {
        let [_, token]: Array<string> = authorization.split(' ');
        let user: user =
          await this.authService.validateTokenAndGetCurrentUser(token);
        req["$currentUser"] = user
        next();
        return;
      }
      throw new InvalidTokenError("No Auth Headers")
    } catch (error) {
      if (error instanceof InvalidTokenError) {
        return res.json(ErrorResponse('Invalid Token'));
      } else  if (error instanceof TokenExpiredError) {
        return res.json(ErrorResponse('Token Expired'));
      } else {
        return res.json(ErrorResponse('Invalid Token'));
      }
    }
  }
}
