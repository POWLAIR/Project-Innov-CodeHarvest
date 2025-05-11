import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { QuestService } from './quest.service';
import { Quest } from './models/quest.model';

@Resolver(() => Quest)
export class QuestResolver {
  constructor(private readonly questService: QuestService) {}

  @Query(() => [Quest])
  async getQuests(@Args('elementId') elementId: string): Promise<Quest[]> {
    return this.questService.getQuestsByElement(elementId);
  }

  @Mutation(() => String)
  async startQuest(
    @Args('userId') userId: string,
    @Args('questId') questId: string,
  ): Promise<string> {
    await this.questService.startUserQuest(userId, questId);
    return "Quête démarrée";
  }
  

  @Mutation(() => Quest)
  async completeQuest(@Args('questId') questId: string): Promise<Quest> {
    return this.questService.completeQuest(questId);
  }
  
}
