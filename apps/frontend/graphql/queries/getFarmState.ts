import { gql } from '@apollo/client';

export const GET_FARM_STATE = gql`
  query GetFarmState {
    level
    xp
    coins
    cornLevel
    barnLevel
    treeLevel
    npcLevel
  }
`;
