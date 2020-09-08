import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';

import { CreatePasteDto } from './dto/create-paste.dto';
import { PasteRepository } from './pastes.repository';
import { Paste } from '../models/paste.entity';
import { User } from '../models/user.entity';

@Injectable()
export class PastesService {
  constructor(
    @InjectRepository(PasteRepository) private pasteRepository: PasteRepository,
  ) {}

  async getPastes(user: User): Promise<Paste[]> {
    return this.pasteRepository.find({
      where: {
        userId: user.id,
      },
    });
  }

  async getPasteById(id: string): Promise<Paste> {
    const paste = await this.pasteRepository.findOne(id);

    if (!paste) {
      throw new NotFoundException(`Paste with ID "${id}" not found`);
    }

    return paste;
  }

  async createPaste(
    createPasteDto: CreatePasteDto,
    user: User,
  ): Promise<Paste> {
    return this.pasteRepository.createPaste(createPasteDto, user);
  }

  async deletePaste(id: string, user: User): Promise<void> {
    const result = await this.pasteRepository.delete({
      id,
      userId: user.id,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Paste with ID "${id}" not found`);
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async deleteExpired(): Promise<number> {
    try {
      const affected = await this.pasteRepository.deleteExpired();

      if (affected > 0) {
        Logger.log(`Deleting expired pastes. Affected: ${affected}`, 'Cron');
      }

      return affected;
    } catch (e) {
      Logger.error(`Error deleting expired pastes`, e.stack, 'Cron');
      return 0;
    }
  }
}
