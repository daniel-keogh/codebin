import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ValidationPipe,
  UsePipes,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreatePasteDto } from './dto/create-paste.dto';
import { PastesService } from './pastes.service';
import { Paste } from '../models/paste.entity';
import { User } from '../models/user.entity';
import { GetUser } from '../common/decorators/get-user.decorator';
import { OptionalJwtGuard } from '../common/guards/optional-jwt.guard';

@Controller('pastes')
export class PastesController {
  constructor(private pastesService: PastesService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getPastes(@GetUser() user: User): Promise<Paste[]> {
    return await this.pastesService.getPastes(user);
  }

  @Get('/:id')
  async getPasteById(@Param('id') id: string): Promise<Paste> {
    return await this.pastesService.getPasteById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  // Don't need to be authenticated to post. If user is null then they're anonymous
  @UseGuards(OptionalJwtGuard)
  async createPaste(
    @Body() createPasteDto: CreatePasteDto,
    @GetUser() user: User,
  ): Promise<Paste> {
    return await this.pastesService.createPaste(createPasteDto, user);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard())
  async deletePaste(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return await this.pastesService.deletePaste(id, user);
  }
}
