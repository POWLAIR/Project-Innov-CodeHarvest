import { gql, useQuery } from '@apollo/client';

const GET_FARM_STATE = gql`
  query GetFarmState {
    getFarmState {
      level
      xp
      coins
    }
  }
`;

export const useFarmState = () => {
  const { data, loading, error } = useQuery(GET_FARM_STATE);
  const state = data?.getFarmState;

  return {
    level: state?.level ?? 1,
    xp: state?.xp ?? 0,
    coins: state?.coins ?? 0,
    loading,
    error,
  };
};
