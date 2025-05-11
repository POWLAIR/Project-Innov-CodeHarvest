import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Quest } from './models/quest.model';

@Injectable()
export class QuestService {
  constructor(private prisma: PrismaService) {}

  async getQuestsByElement(elementId: string) {
    return this.prisma.quest.findMany({
      where: { elementId, isAvailable: true },
      orderBy: { difficulty: 'asc' },
    });
  }
  

  async startQuest(questId: string): Promise<Quest> {
    return this.prisma.quest.update({
      where: { id: questId },
      data: { isActive: true },
    });
  }

  async completeQuest(questId: string): Promise<Quest> {
    const quest = await this.prisma.quest.update({
      where: { id: questId },
      data: {
        isActive: false,
        isCompleted: true,
      },
    });
  
    const farm = await this.prisma.farm.findFirstOrThrow({
      where: { userId: quest.userId },
    });
  
    const elementKeyMap = {
      field: 'cornLevel',
      barn: 'barnLevel',
      tree: 'treeLevel',
      dog: 'npcLevel',
    };
  
    const key = elementKeyMap[quest.elementId];
    if (key) {
      await this.prisma.farm.update({
        where: { id: farm.id },
        data: {
          [key]: { increment: 1 },
        },
      });
    }
  
    return quest;
  }

  async startUserQuest(userId: string, questId: string) {
    // Vérifie si la quête est déjà en cours
    const existing = await this.prisma.userQuest.findFirst({
      where: { userId, questId, status: "En cours" },
    });
  
    if (existing) {
      throw new Error("Cette quête est déjà en cours.");
    }
  
    // Crée un nouvel enregistrement avec le statut "En cours"
    return this.prisma.userQuest.create({
      data: {
        userId,
        questId,
        status: "En cours",
        attempts: 0,
      },
    });
  }
  
}
