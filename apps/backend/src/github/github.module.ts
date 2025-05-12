import { Module } from '@nestjs/common';
import { GithubService } from './github.service';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule], // Import PrismaModule here
  providers: [GithubService],
})
export class GithubModule {}