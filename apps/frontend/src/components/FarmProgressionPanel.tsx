'use client';

import { useFarmState } from '@/hooks/useFarmState';
import { motion } from 'framer-motion';

const MAX_LEVEL = 5;

const FarmProgressionPanel = () => {
    const { farm, loading } = useFarmState();

    if (loading || !farm) return null;

    const buildings = [
        { key: 'cornLevel', label: '🌽 Champ de maïs' },
        { key: 'barnLevel', label: '🏠 Grange' },
        { key: 'treeLevel', label: '🌳 Arbre décoratif' },
        { key: 'npcLevel', label: '🐶 Corgi' },
    ];

    return (
        <div className="mt-10 px-4 w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
            {buildings.map(({ key, label }) => {
                const level = farm[key as keyof typeof farm] as number;
                const progress = (level / MAX_LEVEL) * 100;

                return (
                    <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-[#1e2d2b] border-4 border-yellow-400 p-4 rounded-xl shadow-md text-yellow-100 font-pixel"
                    >
                        <h3 className="text-lg mb-1">{label}</h3>
                        <p className="mb-2">
                            Niveau {level}{' '}
                            {level >= MAX_LEVEL && (
                                <span className="text-green-400">✅ Max</span>
                            )}
                        </p>
                        <div className="w-full h-3 bg-yellow-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-green-500 rounded-full"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        {level < MAX_LEVEL && progress >= 100 && (
                            <p className="text-sm mt-2 text-orange-300">
                                🎉 Amélioration disponible !
                            </p>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
};

export default FarmProgressionPanel;
