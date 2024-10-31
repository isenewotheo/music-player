/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post } from '@nestjs/common';

@Controller("stream")
export class StreamController {
  @Post("/song")
  song() {
    // song stream implementation 
  }
  @Post("/podcast")
  podcast() {
    // podcast stream implementation 
  }
  @Post("/radio")
  radio() {
    // radio stream implementation 
  }
}
