import { Module } from '@nestjs/common';
import { FarmResolver } from './farm.resolver';
import { FarmService } from './farm.service';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
  imports: [AuthModule],
  providers: [FarmResolver, FarmService, PrismaService, JwtAuthGuard],
})
export class FarmModule {}
