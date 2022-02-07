import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
