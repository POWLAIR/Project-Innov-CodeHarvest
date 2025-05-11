// apps/frontend/hooks/useFarmState.ts
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Farm } from '../types/farm';

const GET_FARM_STATE = gql`
  query GetFarmState {
    getFarmState {
      id
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
      id
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
  const [farm, setFarmState] = useState<Farm | null>(null);
  const [loadFarm, { data, loading, error }] = useLazyQuery(GET_FARM_STATE);
  const [updateFarm] = useMutation(UPDATE_FARM_STATE);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) loadFarm();
  }, [loadFarm]);

  useEffect(() => {
    if (data?.getFarmState) {
      setFarmState(data.getFarmState);
    }
  }, [data]);

  const setFarm = async (updatedFarm: Farm) => {
    try {
      await updateFarm({
        variables: { farm: updatedFarm },
        refetchQueries: [{ query: GET_FARM_STATE }],
      });
    } catch (err) {
      console.error('Erreur de mise à jour de la ferme :', err);
    }
  };

  return {
    farm,
    loading,
    error,
    setFarm,
  };
};
