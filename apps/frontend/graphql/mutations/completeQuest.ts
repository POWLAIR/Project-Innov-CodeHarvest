import { gql } from '@apollo/client';

export const COMPLETE_QUEST = gql`
  mutation CompleteQuest($questId: String!) {
    completeQuest(questId: $questId) {
      id
      isCompleted
    }
  }
`;
