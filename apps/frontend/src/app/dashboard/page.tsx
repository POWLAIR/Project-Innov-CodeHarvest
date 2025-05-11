'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import FarmMap from '@/components/FarmMap';
import FarmProgressionPanel from '@/components/FarmProgressionPanel';
import { useFarmState } from '@/hooks/useFarmState';

const Dashboard = () => {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) window.location.href = '/login';
    }, []);

    const { farm, loading, setFarm } = useFarmState();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0f1c1c] font-pixel text-yellow-100 flex items-center justify-center">
                Chargement de la ferme...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0e1616] font-pixel text-yellow-100 overflow-x-hidden">
            <Navbar />

            {/* Carte interactive */}
            <section className="px-4 mt-4">
                <FarmMap farm={farm} setFarm={setFarm} />
            </section>

            {/* HUD Joueur */}
            <div className="mt-4 flex justify-center">
                <div className="bg-[#1e2d2b] border-4 border-yellow-400 px-6 py-2 rounded-lg shadow-md text-center">
                    <p className="text-sm">
                        🎖️ Level: {farm.level} &nbsp;&nbsp; ✨ XP: {farm.xp} &nbsp;&nbsp; 🪙 Coins: {farm.coins}
                    </p>
                </div>
            </div>

            {/* Quêtes */}
            <section className="max-w-lg mx-auto mt-6 px-4">
                <div className="bg-[#162c2b] border-4 border-yellow-400 p-4 rounded-xl shadow-xl">
                    <h2 className="text-xl mb-2 text-center text-yellow-200">📜 Quêtes</h2>
                    <ul className="list-disc list-inside space-y-1 text-yellow-100">
                        <li>– Récolter 10 carottes</li>
                        <li>– Vendre 5 œufs</li>
                    </ul>
                </div>
            </section>

            {/* Progression */}
            <section className="mt-8 px-4">
                <h2 className="text-center text-yellow-200 text-lg mb-3">📈 Progression de la ferme</h2>
                <FarmProgressionPanel />
            </section>
        </div>
    );
};

export default Dashboard;
