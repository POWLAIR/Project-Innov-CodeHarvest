'use client';

import { motion } from 'framer-motion';

const WelcomeModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-effect p-8 w-full max-w-md rounded-2xl text-white text-center"
            >
                <h2 className="text-3xl mb-4 font-bold">🎉 Bienvenue dans ta ferme !</h2>
                <p className="text-white/80 mb-6">
                    Commence à faire évoluer tes bâtiments et à accomplir des quêtes pour devenir un maître fermier.
                </p>
                <button
                    onClick={onClose}
                    className="glass-effect hover:bg-white/10 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-200 hover-scale"
                >
                    Commencer l&#39;aventure
                </button>
            </motion.div>
        </div>
    );
};

export default WelcomeModal;