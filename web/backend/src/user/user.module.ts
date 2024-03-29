import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserService } from './user.service'

@Module({
  imports: [],
  controllers: [],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
