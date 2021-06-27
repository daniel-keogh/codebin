import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsInt, Min, Validate } from 'class-validator';
import { IsValidMime } from '../../common/validators/mime.validator';

export class CreatePasteDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "The paste's content.",
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
  })
  content: string;

  @Validate(IsValidMime)
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The MIME type of this paste.',
    default: 'text/plain',
  })
  mimeType: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Number of minutes until this paste is automatically deleted.',
    default: null,
    minimum: 1,
    example: 10,
  })
  expireAfterMinutes: number;
}
