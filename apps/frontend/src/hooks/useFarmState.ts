import { gql, useQuery, useMutation } from '@apollo/client';
import { Farm } from '../types/farm';

const GET_FARM_STATE = gql`
  query GetFarmState {
    getFarmState {
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

const UPDATE_FARM_STATE = gql`
  mutation UpdateFarmState($farm: FarmInput!) {
    updateFarmState(farm: $farm) {
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

export const useFarmState = () => {
  const { data, loading, error } = useQuery(GET_FARM_STATE);
  const [updateFarm] = useMutation(UPDATE_FARM_STATE);

  const setFarm = async (updatedFarm: Farm) => {
    try {
      await updateFarm({
        variables: { farm: updatedFarm },
        refetchQueries: [{ query: GET_FARM_STATE }]
      });
    } catch (err) {
      console.error('Error updating farm:', err);
    }
  };

  return {
    farm: data?.getFarmState,
    loading,
    error,
    setFarm
  };
};
