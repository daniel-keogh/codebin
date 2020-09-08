import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CheckUsernameDto } from './dto/check-username.dto';
import { AuthService } from './auth.service';
import { Authorized } from './interfaces/authorized.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<Authorized> {
    return await this.authService.register(authCredentialsDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<Authorized> {
    return await this.authService.login(authCredentialsDto);
  }

  @Post('/check_username')
  @HttpCode(HttpStatus.OK)
  async checkUsername(
    @Body(ValidationPipe) checkUsernameDto: CheckUsernameDto,
  ): Promise<void> {
    return await this.authService.checkUsername(checkUsernameDto);
  }
}
