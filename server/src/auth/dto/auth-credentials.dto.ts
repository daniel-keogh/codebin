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
  username: string;

  @IsString()
  @MinLength(8)
  password: string;
}
