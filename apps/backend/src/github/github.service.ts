import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import fetch from 'node-fetch';


@Injectable()
export class GithubService {
  private readonly GITHUB_API_URL = 'https://api.github.com/user/repos';

  constructor(private prisma: PrismaService) {}

  

  async createRepository(repoName: string, userId: string): Promise<string> {
    // Vérifier si le repo existe déjà dans la base de données
    const existingRepo = await this.prisma.userQuest.findUnique({
      where: {
        userId_questId: {
          userId: userId,
          questId: repoName,
        },
      },
    });

    if (existingRepo?.repoUrl) {
      return existingRepo.repoUrl;
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    const response = await fetch(this.GITHUB_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: repoName,
        private: true,
        auto_init: true,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const repoUrl = data.clone_url;

      // Enregistrer l'URL du repo dans la base de données
      await this.prisma.userQuest.update({
        where: {
          userId_questId: {
            userId: userId,
            questId: repoName,
          },
        },
        data: { repoUrl },
      });

      return repoUrl;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create repository');
    }
  }

  async getRepoUrl(userId: string, questId: string): Promise<string> {
    const userQuest = await this.prisma.userQuest.findUnique({
      where: {
        userId_questId: {
          userId,
          questId,
        },
      },
    });
    if (userQuest?.repoUrl) {
      return userQuest.repoUrl;
    }

    throw new Error('Repo not found');
  }
}

