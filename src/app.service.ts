import { Injectable } from '@nestjs/common';

// @Injectable()
export class AppService {
  public count: number = 0;


  getHello(): string {
    return 'Hello World!';
  }
  incrementCount() {
    this.count = this.count + 1
  }
}
