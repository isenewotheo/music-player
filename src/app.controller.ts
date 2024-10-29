import { Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { SuccessResponse } from 'src/utils/response';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(@Req() req: Request) {
    console.log(req.body)
    this.appService.incrementCount()
    return SuccessResponse("success", {count: this.appService.count})
  }
}

@Controller('accounts')
export class AccountsController {
  @Post('/')
  getAccount(@Req() req: Request) {
    console.log(req?.$currentUser?.email)
    return SuccessResponse("Signup successful", {user_name: "oludare", user_id: 1})
  }
}