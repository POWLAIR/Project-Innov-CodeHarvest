'use client';

import { useFarmState } from '@/hooks/useFarmState';
import { motion } from 'framer-motion';

const MAX_LEVEL = 5;

const FarmProgressionPanel = () => {
    const { farm, loading } = useFarmState();

    if (loading || !farm) return null;

    const buildings = [
        { key: 'cornLevel', label: '🌽 Champ de maïs', color: 'from-green-400 to-emerald-600' },
        { key: 'barnLevel', label: '🏠 Grange', color: 'from-amber-400 to-orange-600' },
        { key: 'treeLevel', label: '🌳 Arbre décoratif', color: 'from-lime-400 to-green-600' },
        { key: 'npcLevel', label: '🐶 Corgi', color: 'from-purple-400 to-indigo-600' },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {buildings.map(({ key, label, color }) => {
                const level = farm[key as keyof typeof farm] as number;
                const progress = (level / MAX_LEVEL) * 100;

                return (
                    <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="glass-effect p-6 rounded-xl"
                    >
                        <h3 className="text-xl text-white mb-3">{label}</h3>
                        <p className="mb-4 text-white/90">
                            Niveau {level}
                            {level >= MAX_LEVEL && (
                                <span className="ml-2 text-emerald-300">✨ Max</span>
                            )}
                        </p>
                        <div className="relative h-3 glass-effect rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className={`absolute h-full bg-gradient-to-r ${color}`}
                            />
                        </div>
                        {level < MAX_LEVEL && progress >= 100 && (
                            <p className="text-sm mt-3 text-yellow-300 glow">
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