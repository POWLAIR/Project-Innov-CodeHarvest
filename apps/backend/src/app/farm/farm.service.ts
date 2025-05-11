import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Farm } from './models/farm.model';

@Injectable()
export class FarmService {
  constructor(private prisma: PrismaService) {}

  async getFarmByUserId(userId: string): Promise<Farm> {
    const farm = await this.prisma.farm.findUnique({ where: { userId } });
    if (!farm) throw new Error('Farm not found');
    return farm;
  }

  async upgradeFarmBuilding(userId: string, building: keyof Farm): Promise<Farm> {
    const farm = await this.prisma.farm.findUnique({ where: { userId } });
    if (!farm) throw new Error('Farm not found');

    if (!(building in farm)) throw new Error('Invalid building');
    const currentLevel = farm[building] as number;

    return this.prisma.farm.update({
      where: { userId },
      data: { [building]: currentLevel + 1 },
    });
  }
}
