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
  username: string;
}
