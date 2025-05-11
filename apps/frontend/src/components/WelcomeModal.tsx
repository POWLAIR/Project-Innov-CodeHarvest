'use client';

import { motion } from 'framer-motion';

const WelcomeModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="bg-[#1e2d2b] border-4 border-yellow-400 rounded-xl p-6 text-yellow-100 font-pixel w-80 shadow-2xl text-center"
            >
                <h2 className="text-2xl mb-3">🎉 Bienvenue dans ta ferme !</h2>
                <p className="text-sm mb-4">Commence à faire évoluer tes bâtiments et à accomplir des quêtes.</p>
                <button
                    onClick={onClose}
                    className="mt-2 bg-yellow-400 text-black font-bold px-4 py-2 border-2 border-yellow-700 rounded hover:bg-yellow-300"
                >
                    Commencer
                </button>
            </motion.div>
        </div>
    );
};

export default WelcomeModal;
