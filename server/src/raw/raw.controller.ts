import { Controller, Get, Param, Header, UseFilters } from '@nestjs/common';

import { PastesService } from '../pastes/pastes.service';
import { RawExceptionFilter } from './raw.filter';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@Controller('raw')
@ApiTags('raw')
@UseFilters(RawExceptionFilter)
export class RawController {
  constructor(private pastesService: PastesService) {}

  @Get('/:id')
  @Header('content-type', 'text/plain; charset=utf-8')
  @ApiOperation({ summary: "Get a given paste's content in plain text." })
  @ApiOkResponse({ description: "Returns the paste's content in plain text." })
  @ApiNotFoundResponse({
    description: 'Returns an error message in plain text.',
  })
  @ApiParam({ name: 'id', type: String, description: "The paste's ID." })
  async getRawContent(@Param('id') id: string): Promise<string> {
    return (await this.pastesService.getPasteById(id)).content;
  }
}
