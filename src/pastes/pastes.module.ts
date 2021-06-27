import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { PastesController } from './pastes.controller';
import { PastesService } from './pastes.service';
import { PasteRepository } from './pastes.repository';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([PasteRepository])],
  controllers: [PastesController],
  providers: [PastesService],
  exports: [PastesService],
})
export class PastesModule {}
