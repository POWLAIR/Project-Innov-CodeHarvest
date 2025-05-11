import { gql, useQuery } from '@apollo/client';

const GET_QUESTS = gql`
  query GetQuests($elementId: String!) {
    getQuests(elementId: $elementId) {
      id
      title
      description
      reward
    }
  }
`;

export const useQuests = (elementId: string) => {
  const { data, loading, error } = useQuery(GET_QUESTS, {
    variables: { elementId },
    skip: !elementId,
  });

  return { quests: data?.getQuests || [], loading, error };
};
