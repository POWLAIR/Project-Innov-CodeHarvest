import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Quest {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  elementId: string;

  @Field(() => Int)
  difficulty: number;

  @Field(() => Int)
  xp_reward: number;

  @Field(() => Int)
  coins_reward: number;

  @Field()
  isAvailable: boolean;

  @Field()
  isActive: boolean;

  @Field()
  isCompleted: boolean;

  @Field()
  createdAt: Date;
}
