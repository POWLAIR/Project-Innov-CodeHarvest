// frontend/graphql/mutations/upgradeFarmBuilding.ts
import { gql } from "@apollo/client";

export const UPGRADE_FARM_BUILDING = gql`
  mutation UpgradeFarmBuilding($building: String!) {
    upgradeFarmBuilding(building: $building) {
      level
      xp
      coins
      cornLevel
      barnLevel
      treeLevel
      npcLevel
    }
  }
`;
