'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useMutation, gql, useLazyQuery } from '@apollo/client';
import { FarmElement } from '../../lib/farmElements';
import QuestSuccessModal from './QuestSuccessModal';

interface Quest {
    id: string;
    title: string;
    description: string;
    isActive: boolean;
    isCompleted: boolean;
}

interface FarmInteractionPanelProps {
    element: FarmElement | null;
    onClose: () => void;
    onUpgrade: () => void;
}

const UPGRADE_BUILDING = gql`
  mutation UpgradeFarmBuilding($building: String!) {
    upgradeFarmBuilding(building: $building) {
      level
      xp
      coins
      cornLevel
      barnLevel
      treeLevel
      npcLevel
      chickenLevel
      cowLevel
      sheepLevel
    }
  }
`;

const GET_QUESTS = gql`
  query GetQuests($elementId: String!) {
    getQuests(elementId: $elementId) {
      id
      title
      description
      isActive
      isCompleted
    }
  }
`;

const COMPLETE_QUEST = gql`
  mutation CompleteQuest($questId: String!) {
    completeQuest(questId: $questId) {
      id
      isCompleted
    }
  }
`;

const FarmInteractionPanel = ({ element, onClose, onUpgrade }: FarmInteractionPanelProps) => {
    const [tab, setTab] = useState<'info' | 'quests'>('info');
    const buildingKey =
        element?.type === 'field' ? 'cornLevel' : element?.type ? `${element.type}Level` : null;

    const [upgradeBuilding, { loading: loadingUpgrade }] = useMutation(UPGRADE_BUILDING, {
        variables: buildingKey ? { building: buildingKey } : undefined,
        onCompleted: () => {
            onUpgrade();
            onClose();
        },
        onError: (err) => console.error(err),
    });

    const [completeQuest] = useMutation(COMPLETE_QUEST);
    const [loadQuests, { data, loading: loadingQuests, error }] = useLazyQuery(GET_QUESTS);
    const [quests, setQuests] = useState<Quest[]>([]);
    const [showRewardModal, setShowRewardModal] = useState(false);

    useEffect(() => {
        if (tab === 'quests' && element?.id) {
            loadQuests({ variables: { elementId: element.id } });
        }
    }, [tab, element?.id, loadQuests]);

    useEffect(() => {
        if (data?.getQuests) {
            setQuests(data.getQuests);
        }
    }, [data]);

    return (
        <AnimatePresence>
            {element && (
                <>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#1e2d2b] border-4 border-yellow-400 text-yellow-100 font-pixel px-6 py-4 rounded-xl shadow-lg z-40 w-[320px]"
                    >
                        <div className="flex justify-between mb-2">
                            <button
                                onClick={() => setTab('info')}
                                className={`px-2 ${tab === 'info' ? 'text-yellow-300' : 'text-yellow-500'}`}
                            >
                                Infos
                            </button>
                            <button
                                onClick={() => setTab('quests')}
                                className={`px-2 ${tab === 'quests' ? 'text-yellow-300' : 'text-yellow-500'}`}
                            >
                                Quêtes
                            </button>
                        </div>

                        {tab === 'info' ? (
                            <div>
                                <h2 className="text-lg mb-2">{element.alt}</h2>
                                <p>Type : {element.type}</p>
                                <p>Niveau : {element.level}</p>

                                <button
                                    className="mt-3 bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-300 disabled:opacity-50"
                                    onClick={() => upgradeBuilding()}
                                    disabled={loadingUpgrade || !buildingKey}
                                >
                                    {loadingUpgrade ? 'Amélioration...' : 'Améliorer'}
                                </button>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-lg mb-2">📋 Quêtes disponibles</h2>
                                {loadingQuests ? (
                                    <p>Chargement...</p>
                                ) : error ? (
                                    <p>Erreur lors du chargement</p>
                                ) : quests.length === 0 ? (
                                    <p>Aucune quête disponible</p>
                                ) : (
                                    <ul className="space-y-2">
                                        {quests.map((quest) => (
                                            <li key={quest.id} className="border border-yellow-300 p-2 rounded">
                                                <p className="text-yellow-200 font-bold">{quest.title}</p>
                                                <p className="text-sm">{quest.description}</p>
                                                {!quest.isCompleted && (
                                                    <button
                                                        className="mt-2 text-sm text-blue-400 hover:underline"
                                                        onClick={async () => {
                                                            await completeQuest({ variables: { questId: quest.id } });
                                                            setQuests((prev) =>
                                                                prev.map((q) =>
                                                                    q.id === quest.id ? { ...q, isCompleted: true, isActive: false } : q
                                                                )
                                                            );
                                                            onUpgrade();
                                                            setShowRewardModal(true);
                                                        }}
                                                        disabled={quest.isCompleted}
                                                    >
                                                        Terminer
                                                    </button>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}

                        <button
                            className="mt-4 text-yellow-300 hover:text-red-400 text-sm"
                            onClick={onClose}
                        >
                            Fermer
                        </button>
                    </motion.div>

                    {showRewardModal && (
                        <QuestSuccessModal
                            xp={50}
                            coins={100}
                            upgradeInfo="Champ de maïs niveau 2"
                            onClose={() => setShowRewardModal(false)}
                        />
                    )}
                </>
            )}
        </AnimatePresence>
    );
};

export default FarmInteractionPanel;
