import { Resolver, Query, Args } from '@nestjs/graphql';
import { GithubService } from './github.service';

@Resolver()
export class GithubResolver {
  constructor(private readonly githubService: GithubService) {}
  
  @Query(() => String)
  async getUserQuestRepo(
    @Args('userId') userId: string,
    @Args('questId') questId: string,
  ): Promise<string> {
    // Récupérer l'URL du repo pour une quête donnée
    return await this.githubService.getRepoUrl(userId, questId);
  }
}
