import { gql } from '@apollo/client';

export const GET_FARM_STATE = gql`
  query GetFarmState {
    me {
      id
      level
      xp
      coins
      quests {
        id
        title
        completed
      }
    }
  }
`;
