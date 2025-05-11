import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { FarmService } from './farm.service';
import { Farm } from './models/farm.model';

@Resolver(() => Farm)
export class FarmResolver {
  constructor(private readonly farmService: FarmService) {}

  @Query(() => Farm)
  async getFarmState(@Context('user') user: any): Promise<Farm> {
    return this.farmService.getFarmByUserId(user.id);
  }

  @Mutation(() => Farm)
  async upgradeFarmBuilding(
    @Context('user') user: any,
    @Args('building', { type: () => String }) building: keyof Farm,
  ): Promise<Farm> {
    return this.farmService.upgradeFarmBuilding(user.id, building);
  }
}
