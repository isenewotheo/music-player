import { PrismaService } from './prisma.service';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AccountsController, AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.module';
import { AuthGuardMiddleware } from './Auth/auth.middleware';
import { AuthService } from './Auth/auth.service';

@Module({
  imports: [AuthModule],
  controllers: [AppController, AccountsController],
  providers: [PrismaService, AppService, AuthService],
  exports: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthGuardMiddleware)
      .exclude(
        { path: '/auth/signup', method: RequestMethod.POST },
        { path: '/auth/login', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
