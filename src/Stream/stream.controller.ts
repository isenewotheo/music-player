/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Param, Get, Res } from '@nestjs/common';
import { SuccessResponse } from 'src/utils/response';
import { StreamService } from './stream.service';
import { Response } from 'express';

@Controller('stream')
export class StreamController {
  constructor(private readonly streamService: StreamService) {}
  @Get('/song/:songID')
  song(@Param('songID') params: string, @Res() res: Response) {
    let songID: string = params['songID'];
    return this.streamService.initStream(songID, res);
    return SuccessResponse('Params ', params);
    // song stream implementation
    // console.log("params", params['songID'])
  }
  @Get('/podcast')
  podcast() {
    // podcast stream implementation
  }
  @Get('/radio')
  radio() {
    // radio stream implementation
  }
}
