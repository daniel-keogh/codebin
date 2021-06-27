import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBody,
  ApiOperation,
  ApiBadRequestResponse,
  ApiTags,
  ApiConflictResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CheckUsernameDto } from './dto/check-username.dto';
import { AuthorizedReponseDto } from './dto/authorized-response.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Create a new user.' })
  @ApiCreatedResponse({
    description: 'User registered successfully.',
    type: AuthorizedReponseDto,
  })
  @ApiConflictResponse({
    description: 'The provided username already exists.',
  })
  @ApiBody({ type: AuthCredentialsDto })
  register(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<AuthorizedReponseDto> {
    return this.authService.register(authCredentialsDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log-in a user.' })
  @ApiOkResponse({
    description: 'User logged in successfully.',
    type: AuthorizedReponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid login credentials.' })
  @ApiBody({ type: AuthCredentialsDto })
  async login(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<AuthorizedReponseDto> {
    return await this.authService.login(authCredentialsDto);
  }

  @Post('/check_username')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Check if a given username is available.' })
  @ApiNoContentResponse({ description: 'The provided username is available.' })
  @ApiBadRequestResponse({
    description: 'The provided username is already taken.',
  })
  @ApiBody({ type: CheckUsernameDto })
  async checkUsername(
    @Body(ValidationPipe) checkUsernameDto: CheckUsernameDto,
  ): Promise<void> {
    return await this.authService.checkUsername(checkUsernameDto);
  }
}
