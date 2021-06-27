import { Module } from '@nestjs/common';

import { RawController } from './raw.controller';
import { PastesModule } from '../pastes/pastes.module';

@Module({
  controllers: [RawController],
  imports: [PastesModule],
})
export class RawModule {}
