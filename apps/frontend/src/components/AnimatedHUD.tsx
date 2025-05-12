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
                        initial={{ opacity: 0, x: 20, y: 0 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, x: 20, y: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="glass-effect px-6 py-3 rounded-xl text-white shadow-lg max-w-sm"
                    >
                        <p className="text-sm">{message}</p>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );

    return { addNotification, HUD };
};