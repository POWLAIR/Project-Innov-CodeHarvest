'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FC } from 'react';

interface QuestSuccessModalProps {
    xp: number;
    coins: number;
    upgradeInfo?: string;
    onClose: () => void;
}

const QuestSuccessModal: FC<QuestSuccessModalProps> = ({ xp, coins, upgradeInfo, onClose }) => {
    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="glass-effect p-8 rounded-2xl text-center max-w-md w-[90%]"
                >
                    <div className="relative">
                        <motion.div
                            initial={{ rotate: -10, scale: 0.9 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl mb-6"
                        >
                            🎉
                        </motion.div>
                        <h2 className="text-3xl font-bold text-white mb-6">Quête réussie !</h2>

                        <div className="space-y-4 mb-8">
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="glass-effect py-3 px-6 rounded-xl"
                            >
                                <p className="text-xl text-white">✨ +{xp} XP</p>
                            </motion.div>

                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="glass-effect py-3 px-6 rounded-xl"
                            >
                                <p className="text-xl text-white">🪙 +{coins} pièces</p>
                            </motion.div>
                        </div>

                        {upgradeInfo && (
                            <motion.p
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="text-emerald-300 text-lg mb-6 glow"
                            >
                                ⬆️ {upgradeInfo}
                            </motion.p>
                        )}

                        <button
                            onClick={onClose}
                            className="glass-effect hover:bg-white/10 px-8 py-3 rounded-xl text-white font-semibold transition-all hover-scale"
                        >
                            Continuer l&#39;aventure
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default QuestSuccessModal;