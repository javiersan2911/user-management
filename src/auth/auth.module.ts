import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { configService } from 'src/config/config.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthController } from './auth.controller';
import { PoliciesGuard } from 'src/access-control/guards/policies.guard';
import { CaslModule } from 'src/access-control/casl.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    CaslModule,
    JwtModule.register({
      global: true,
      secret: configService.getJwtSecret(),
      signOptions: { expiresIn: configService.getJwtExpirationTime() },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }, {
      provide: APP_GUARD,
      useClass: PoliciesGuard
    }, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
