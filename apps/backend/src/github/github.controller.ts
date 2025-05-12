import { Controller, Post, Body } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('quests')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Post('create-repo')
  async createRepo(@Body() body: { questId: string; userId: string }): Promise<{ repoUrl: string }> {
    const { questId, userId } = body;
    const repoName = `quest-${questId}-${Date.now()}`;
    const repoUrl = await this.githubService.createRepository(repoName, userId);
    return { repoUrl };
  }
}
