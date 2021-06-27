import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Repository, EntityRepository } from 'typeorm';
import { User } from '../models/user.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

const CONFLICT_ERROR = 23505;

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async register(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.username = username;

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, salt);

    try {
      return await user.save();
    } catch (e) {
      if (+e.code === CONFLICT_ERROR) {
        throw new ConflictException('username already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async validatePassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    const { username, password } = authCredentialsDto;

    const user = await this.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }
}
