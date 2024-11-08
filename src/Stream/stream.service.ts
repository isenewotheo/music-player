/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { FileStorageService } from 'src/FileStorage/filestorage.service';
import { createReadStream, readFileSync } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Injectable()
export class StreamService {
  constructor(private readonly minioStorageService: FileStorageService) {}
  initStream(songID: string, res: Response) {
    try {
      const filePath = join(__dirname, '../../', 'public', 'output.mpd');
      const fileStream = createReadStream(filePath);
      res.sendFile(filePath);
      // const data = readFileSync(
      //   '/Users/dare/Desktop/projects/music-player-backend-nest/public/output.mpd',
      //   'utf8',
      // );
      // console.log('File contents:', data);
      // return data;
    } catch (err) {
      console.error('Error reading file:', err);
    }
  }
  getChunk(chunkName: string) {}
}
