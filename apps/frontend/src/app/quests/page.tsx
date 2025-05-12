'use client';

import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import { Quest } from '@/types/quest';

const GET_QUESTS = gql`
  query GetQuests {
    getQuests {
      id
      title
      description
      isActive
      isCompleted
    }
  }
`;

const QuestsPage = () => {
    const { data, loading, error } = useQuery(GET_QUESTS);
    const [quests, setQuests] = useState<Quest[]>([]);

    useEffect(() => {
        if (data?.getQuests) {
            setQuests(data.getQuests);
        }
    }, [data]);

    if (loading) return <p>Chargement des quêtes...</p>;
    if (error) return <p>Erreur lors du chargement des quêtes</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-semibold text-white mb-6">📜 Quêtes en cours</h1>
            <div className="space-y-4">
                {quests.map((quest) => (
                    <div key={quest.id} className="glass-effect p-6 rounded-xl">
                        <h2 className="text-lg text-white">{quest.title}</h2>
                        <p className="text-white/80">{quest.description}</p>
                        <div className="flex justify-between items-center mt-4">
                            <span className={`text-sm ${quest.isCompleted ? 'text-emerald-300' : 'text-yellow-300'}`}>
                                {quest.isCompleted ? 'Complétée' : 'En cours'}
                            </span>
                            <Link href={`/quests/${quest.id}`} className="text-indigo-300 hover:text-indigo-200">
                                Voir la quête
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestsPage;
