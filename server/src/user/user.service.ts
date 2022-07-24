import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async login(name: string, password: string) {
    const user = await this.repository.findOneBy({
      user_name: name,
    });
    if (user.user_passwd === password) {
      return true;
    } else {
      return false;
    }
  }

  async getUserById(id: number) {
    const user = await this.repository.findOneBy({
      user_id: id,
    });
    return user;
  }

  async getAllUsers() {
    const users = await this.repository.find();
    console.log(users);
    return users;
  }
}
