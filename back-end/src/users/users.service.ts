import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  async findOne(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) return null;
    return user;
  }

  async create(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const userCreated = new this.userModel({
      email: dto.email,
      password: hashedPassword,
    });
    return userCreated.save();
  }
}
