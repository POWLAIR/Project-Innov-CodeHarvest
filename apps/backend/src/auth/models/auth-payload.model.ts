import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class AuthPayload {
  @Field(() => ID)
  userId: string;
}
