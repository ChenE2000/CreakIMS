import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
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

  @Get('/userinfo/:id')
  async getUserById(@Param('id', ParseIntPipe) userId) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException();
    }
    return {
      code: 200,
      data: [user],
    };
  }

  @Get('all')
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    if (!users) {
      throw new NotFoundException();
    }
    return {
      code: 200,
      data: users,
    };
  }
}
