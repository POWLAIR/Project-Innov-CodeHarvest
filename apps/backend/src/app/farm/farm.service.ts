import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Farm } from './models/farm.model';

@Injectable()
export class FarmService {
  constructor(private prisma: PrismaService) {}

  async getFarmByUserId(userId: string): Promise<Farm> {
    const farm = await this.prisma.farm.findUnique({
      where: { userId },
    });
    if (!farm) {
      throw new Error('Farm not found');
    }
    return farm;
  }
}
