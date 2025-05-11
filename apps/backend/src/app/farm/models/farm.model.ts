import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Farm {
  @Field(() => Int)
  level: number;

  @Field(() => Int)
  xp: number;

  @Field(() => Int)
  coins: number;

  @Field(() => Int)
  cornLevel: number;

  @Field(() => Int)
  barnLevel: number;

  @Field(() => Int)
  treeLevel: number;

  @Field(() => Int)
  npcLevel: number;
}
