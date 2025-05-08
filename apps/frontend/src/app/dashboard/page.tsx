'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import FarmMap from '@/components/FarmMap';
import { useFarmState } from '@/hooks/useFarmState';

const Dashboard = () => {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) window.location.href = '/login';
    }, []);

    const { level, xp, coins, loading } = useFarmState();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0f1c1c] font-pixel text-yellow-100 flex items-center justify-center">
                Chargement de la ferme...
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-[#0f1c1c] font-pixel text-yellow-100 overflow-hidden">
            <Navbar />

            {/* Zone ferme avec niveau dynamique */}
            <FarmMap level={level} />

            {/* HUD joueur */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-[#1e2d2b] border-4 border-yellow-400 px-6 py-2 rounded-lg shadow-xl z-20">
                <p className="text-sm">
                    Level: {level} | XP: {xp} | Coins: {coins}
                </p>
            </div>

            {/* Quêtes */}
            <div className="max-w-lg mx-auto mt-10 p-4 border-4 border-yellow-400 bg-[#0b1d1d] rounded-xl shadow-xl z-10">
                <h2 className="text-xl mb-2 text-center">Quêtes</h2>
                <ul className="list-disc list-inside">
                    <li>– Récolter 10 carottes</li>
                    <li>– Vendre 5 œufs</li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
