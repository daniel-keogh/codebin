import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthorizedReponseDto {
  @IsString()
  @ApiProperty({ description: 'A JSON Web Token (JWT).' })
  accessToken: string;
}
