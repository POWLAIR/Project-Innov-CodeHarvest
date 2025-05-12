import { gql } from '@apollo/client';

export const GET_USER_QUEST_REPO = gql`
  query GetUserQuestRepo($userId: String!, $questId: String!) {
    getUserQuestRepo(userId: $userId, questId: $questId)
  }
`;
