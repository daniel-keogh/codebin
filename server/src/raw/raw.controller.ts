import { Controller, Get, Param, Header, UseFilters } from '@nestjs/common';

import { PastesService } from '../pastes/pastes.service';
import { RawExceptionFilter } from './raw.filter';

@Controller('raw')
@UseFilters(RawExceptionFilter)
export class RawController {
  constructor(private pastesService: PastesService) {}

  @Get('/:id')
  @Header('content-type', 'text/plain; charset=utf-8')
  async getRawContent(@Param('id') id: string): Promise<string> {
    return (await this.pastesService.getPasteById(id)).content;
  }
}
