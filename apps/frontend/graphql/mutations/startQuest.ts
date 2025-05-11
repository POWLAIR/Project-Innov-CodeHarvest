import { gql } from '@apollo/client';

export const START_QUEST = gql`
  mutation StartQuest($questId: String!) {
    startQuest(questId: $questId) {
      id
      isActive
    }
  }
`;
