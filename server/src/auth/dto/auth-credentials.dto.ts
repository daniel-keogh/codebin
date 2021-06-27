import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsAlphanumeric,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @IsAlphanumeric()
  @MinLength(3)
  @MaxLength(20)
  @ApiProperty({
    description: "The user's username.",
    minLength: 3,
    maxLength: 20,
    example: 'johnDoe123',
  })
  username: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({
    description: "The user's password.",
    minLength: 8,
    example: 'du98y273dhqj&k',
  })
  password: string;
}
