import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { configService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './access-control/casl.module';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()), UsersModule, AuthModule, CaslModule],
  controllers: [AppController],
})
export class AppModule { }
