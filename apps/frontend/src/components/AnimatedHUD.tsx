'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface HUDNotification {
    id: number;
    message: string;
}

let idCounter = 0;

export const useHUD = () => {
    const [notifications, setNotifications] = useState<HUDNotification[]>([]);

    const addNotification = (message: string) => {
        const id = idCounter++;
        setNotifications((prev) => [...prev, { id, message }]);
        setTimeout(() => {
            setNotifications((prev) => prev.filter((notif) => notif.id !== id));
        }, 2000);
    };

    const HUD = () => (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            <AnimatePresence>
                {notifications.map(({ id, message }) => (
                    <motion.div
                        key={id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="bg-[#1e2d2b]/80 backdrop-blur-sm text-yellow-200 border border-yellow-400 px-4 py-2 rounded-lg shadow-lg font-pixel text-sm"
                    >
                        {message}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );

    return { addNotification, HUD };
};
