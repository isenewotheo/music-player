import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { Auth } from './auth.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [Auth],
  providers: [AuthService, PrismaService],
  exports: [AuthService]
})
export class AuthModule {}