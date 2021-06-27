import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CheckUsernameDto } from './dto/check-username.dto';
import { AuthorizedReponseDto } from './dto/authorized-response.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async register(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<AuthorizedReponseDto> {
    const user = await this.userRepository.register(authCredentialsDto);

    const { id: userId, username } = user;

    const payload: JwtPayload = { username, userId };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }

  async login(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<AuthorizedReponseDto> {
    const user = await this.userRepository.validatePassword(authCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('Invalid login credentials');
    }

    const { id: userId, username } = user;
    const payload: JwtPayload = { username, userId };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }

  async checkUsername(checkUsernameDto: CheckUsernameDto): Promise<void> {
    const user = await this.userRepository.findOne({
      username: checkUsernameDto.username,
    });

    if (user) {
      throw new BadRequestException('That username is already taken');
    }
  }
}
