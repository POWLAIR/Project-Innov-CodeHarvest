import { Module } from '@nestjs/common';
import { FarmResolver } from './farm.resolver';
import { FarmService } from './farm.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [FarmResolver, FarmService, PrismaService],
})
export class FarmModule {}
