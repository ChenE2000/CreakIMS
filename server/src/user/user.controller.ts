import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  async login(@Body(ValidationPipe) input: UserLoginDto) {
    console.log(input);
    const isLogin = await this.userService.login(input.name, input.passwd);
    if (isLogin) {
      return {
        code: 200,
        msg: '登录成功',
      };
    } else {
      return {
        code: 201,
        msg: '登录失败',
      };
    }
  }
}
