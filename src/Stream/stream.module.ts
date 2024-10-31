import { StreamService } from './stream.service';
import { StreamController } from './stream.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [StreamController],
  providers: [StreamService],
})
export class StreamModule {}
