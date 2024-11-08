import { StreamService } from './stream.service';
import { StreamController } from './stream.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { FileStorageService } from 'src/FileStorage/filestorage.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'public'),
      serveRoot: "/api/stream/*/--xy"
    }),],
  controllers: [StreamController],
  providers: [StreamService, FileStorageService],
})
export class StreamModule {}
