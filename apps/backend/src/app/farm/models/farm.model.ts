import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Farm {
  @Field(() => Int)
  level: number;

  @Field(() => Int)
  xp: number;

  @Field(() => Int)
  coins: number;
}
