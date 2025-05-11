// components/QuestSuccessModal.tsx
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
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="bg-[#1e2d2b] border-4 border-yellow-400 text-yellow-100 font-pixel p-6 rounded-xl shadow-xl w-80 text-center"
                >
                    <h2 className="text-2xl mb-4 text-green-300">🎉 Quête réussie !</h2>
                    <p className="text-lg">✨ +{xp} XP</p>
                    <p className="text-lg">🪙 +{coins} pièces</p>

                    {upgradeInfo && (
                        <p className="text-green-400 text-sm mt-2">⬆️ {upgradeInfo}</p>
                    )}

                    <button
                        onClick={onClose}
                        className="mt-6 px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300"
                    >
                        Retourner à la ferme
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default QuestSuccessModal;