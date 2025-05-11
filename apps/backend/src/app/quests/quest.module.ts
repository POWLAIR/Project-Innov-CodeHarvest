import { Module } from '@nestjs/common';
import { QuestResolver } from './quest.resolver';
import { QuestService } from './quest.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [QuestResolver, QuestService, PrismaService],
})
export class QuestModule {}
