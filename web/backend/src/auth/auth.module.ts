import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'
import { UserModule } from '../user/user.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import * as dotenv from 'dotenv'
dotenv.config()

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      // ここでsecretを指定しているのだが、
      // auth.serviceのsignメソッド内で別途secretオプションを指定しないと
      // エラーになるので、以下がうまく効いていない可能性あり
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
