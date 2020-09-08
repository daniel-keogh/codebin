import {
  IsNotEmpty,
  IsOptional,
  IsInt,
  Min,
  Validate,
} from 'class-validator';
import { IsValidMime } from '../../common/validators/mime.validator';

export class CreatePasteDto {
  @IsNotEmpty()
  content: string;

  @Validate(IsValidMime)
  @IsOptional()
  mimeType: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  expireAfterMinutes: number;
}
