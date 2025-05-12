import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { AuthModule } from './auth/auth.module';
import { FarmModule } from './app/farm/farm.module';
import { QuestModule } from './app/quests/quest.module';
import { GithubModule } from './github/github.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }),
    }),
    AuthModule,
    FarmModule,
    QuestModule,
    GithubModule, 
  ],
  providers: [AppResolver],
})
export class AppModule {}
