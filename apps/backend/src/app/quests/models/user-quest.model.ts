import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserQuest {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  questId: string;

  @Field()
  status: string;

  @Field()
  attempts: number;

  @Field()
  createdAt: Date;
}
