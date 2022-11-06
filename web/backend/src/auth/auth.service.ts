import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(userId: number, pass: string): Promise<any> {
    console.log('===', userId)
    const user = await this.usersService.findById(userId)
    return user
    /*
    if (user && user.password === pass) {
      const { password, ...result } = user
      return result
    }
    */
    return null
  }
}
