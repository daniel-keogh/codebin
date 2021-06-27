import { InternalServerErrorException } from '@nestjs/common';
import { Repository, EntityRepository, getConnection } from 'typeorm';

import { CreatePasteDto } from './dto/create-paste.dto';
import { Paste } from '../models/paste.entity';
import { User } from '../models/user.entity';

@EntityRepository(Paste)
export class PasteRepository extends Repository<Paste> {
  async createPaste(
    createPasteDto: CreatePasteDto,
    user: User,
  ): Promise<Paste> {
    const { content, mimeType, expireAfterMinutes } = createPasteDto;

    const paste = new Paste();
    paste.content = content;
    paste.user = user;

    if (mimeType) {
      paste.mimeType = mimeType;
    }

    if (expireAfterMinutes) {
      paste.expireAfterMinutes = expireAfterMinutes;
    }

    try {
      await paste.save();
    } catch (_) {
      throw new InternalServerErrorException();
    }

    return paste;
  }

  async deleteExpired(): Promise<number> {
    return (
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Paste)
        .where("createdAt + expireAfterMinutes * INTERVAL '1 minute' < now()")
        .execute()
    ).affected;
  }
}
