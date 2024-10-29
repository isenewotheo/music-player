import { Controller, Post } from "@nestjs/common";
import { SuccessResponse } from "src/utils/response";


@Controller()
export class Auth{
  @Post("/login")
  login() {
    return SuccessResponse('Login successful')
  }
}