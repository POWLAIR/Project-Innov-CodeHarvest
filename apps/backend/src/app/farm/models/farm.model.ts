// apps/backend/src/app/farm/models/farm.model.ts
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Farm {
  @Field(() => ID)
  id: string;

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
