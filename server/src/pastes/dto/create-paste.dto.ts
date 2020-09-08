import {
  IsNotEmpty,
  IsMimeType,
  IsOptional,
  Min,
  IsInt,
} from 'class-validator';

export class CreatePasteDto {
  @IsNotEmpty()
  content: string;

  @IsMimeType()
  @IsOptional()
  mimeType: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  expireAfterMinutes: number;
}
