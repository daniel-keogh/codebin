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
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiTags,
  ApiParam,
  ApiOperation,
} from '@nestjs/swagger';

import { CreatePasteDto } from './dto/create-paste.dto';
import { PastesService } from './pastes.service';
import { Paste } from '../models/paste.entity';
import { User } from '../models/user.entity';
import { GetUser } from '../common/decorators/get-user.decorator';
import { OptionalJwtGuard } from '../common/guards/optional-jwt.guard';

@Controller('pastes')
@ApiTags('pastes')
export class PastesController {
  constructor(private pastesService: PastesService) {}

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all of a the authorized user's pastes." })
  @ApiOkResponse({
    description: "Gets all of a given user's pastes.",
    type: [Paste],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  async getPastes(@GetUser() user: User): Promise<Paste[]> {
    return await this.pastesService.getPastes(user);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a paste by its ID.' })
  @ApiOkResponse({
    description: 'The paste with the given ID was returned.',
    type: Paste,
  })
  @ApiNotFoundResponse({
    description: 'The paste with the given ID does not exist.',
  })
  @ApiParam({ name: 'id', description: "The paste's ID." })
  async getPasteById(@Param('id') id: string): Promise<Paste> {
    return await this.pastesService.getPasteById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(
    // Don't need to be authenticated to post: If user is null then they're anonymous.
    OptionalJwtGuard,
  )
  @ApiOperation({ summary: 'Create a new paste.' })
  @ApiOkResponse({ description: 'Creates a new paste.', type: Paste })
  async createPaste(
    @Body() createPasteDto: CreatePasteDto,
    @GetUser() user: User,
  ): Promise<Paste> {
    return await this.pastesService.createPaste(createPasteDto, user);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete the paste with the given ID.' })
  @ApiUnauthorizedResponse({ description: 'The user is unauthorized.' })
  @ApiNoContentResponse({ description: 'Paste deleted successfully.' })
  @ApiParam({ name: 'id', description: "The paste's ID." })
  async deletePaste(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return await this.pastesService.deletePaste(id, user);
  }
}
