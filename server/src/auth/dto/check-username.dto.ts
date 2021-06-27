import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsAlphanumeric,
} from 'class-validator';

export class CheckUsernameDto {
  @IsString()
  @IsAlphanumeric()
  @MinLength(3)
  @MaxLength(20)
  @ApiProperty({
    description: 'The username to check.',
    minLength: 3,
    maxLength: 20,
  })
  username: string;
}
