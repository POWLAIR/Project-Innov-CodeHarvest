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
    const buildingKey = element?.type === 'field' ? 'cornLevel' : element?.type ? `${element.type}Level` : null;

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
                        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 glass-effect p-6 rounded-2xl text-white w-[90%] max-w-md z-40"
                    >
                        <div className="flex justify-between mb-6">
                            <button
                                onClick={() => setTab('info')}
                                className={`px-4 py-2 rounded-xl transition-all ${tab === 'info' ? 'glass-effect text-white' : 'text-white/70 hover:text-white'}`}
                            >
                                Infos
                            </button>
                            <button
                                onClick={() => setTab('quests')}
                                className={`px-4 py-2 rounded-xl transition-all ${tab === 'quests' ? 'glass-effect text-white' : 'text-white/70 hover:text-white'}`}
                            >
                                Quêtes
                            </button>
                        </div>

                        {tab === 'info' ? (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">{element.alt}</h2>
                                <div className="space-y-2 text-white/80">
                                    <p>Type : {element.type}</p>
                                    <p>Niveau : {element.level}</p>
                                </div>

                                <button
                                    className="w-full glass-effect hover:bg-white/10 py-3 rounded-xl transition-all hover-scale disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={() => upgradeBuilding()}
                                    disabled={loadingUpgrade || !buildingKey}
                                >
                                    {loadingUpgrade ? 'Amélioration...' : 'Améliorer'}
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">📋 Quêtes disponibles</h2>
                                {loadingQuests ? (
                                    <p className="text-white/70">Chargement...</p>
                                ) : error ? (
                                    <p className="text-red-400">Erreur lors du chargement</p>
                                ) : quests.length === 0 ? (
                                    <p className="text-white/70">Aucune quête disponible</p>
                                ) : (
                                    <div className="space-y-3">
                                        {quests.map((quest) => (
                                            <div key={quest.id} className="glass-effect p-4 rounded-xl space-y-2">
                                                <h3 className="text-lg font-semibold">{quest.title}</h3>
                                                <p className="text-white/80">{quest.description}</p>
                                                {!quest.isCompleted && (
                                                    <button
                                                        className="text-indigo-300 hover:text-indigo-200 hover-scale text-sm"
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
                                                        Terminer la quête
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        <button
                            className="mt-6 text-white/70 hover:text-white text-sm transition-colors"
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