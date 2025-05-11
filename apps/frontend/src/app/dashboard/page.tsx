'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import FarmMap from '@/components/FarmMap';
import FarmProgressionPanel from '@/components/FarmProgressionPanel';
import WelcomeModal from '@/components/WelcomeModal';
import { useFarmState } from '@/hooks/useFarmState';
import { useHUD } from '@/components/AnimatedHUD';

const Dashboard = () => {
    const { farm, loading, setFarm } = useFarmState();
    const { HUD, addNotification } = useHUD();
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) window.location.href = '/login';

        // Affiche la modale de bienvenue uniquement si elle n'a pas déjà été vue
        const hasSeenWelcome = localStorage.getItem('welcomeShown');
        if (!hasSeenWelcome && farm?.level === 1) {
            setShowWelcome(true);
            localStorage.setItem('welcomeShown', 'true');
        }
    }, [farm]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0f1c1c] font-pixel text-yellow-100 flex items-center justify-center">
                Chargement de la ferme...
            </div>
        );
    }

    if (!farm) {
        return (
            <div className="min-h-screen bg-[#0e1616] font-pixel text-yellow-100 flex items-center justify-center">
                🚧 Aucune ferme trouvée pour cet utilisateur.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0e1616] font-pixel text-yellow-100 overflow-x-hidden relative">
            <HUD />
            <Navbar />
            {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}

            {/* Carte interactive de la ferme */}
            <section className="px-4 mt-4">
                <FarmMap farm={farm} setFarm={setFarm} notify={addNotification} />
            </section>

            {/* Statistiques joueur */}
            <div className="mt-4 flex justify-center">
                <div className="bg-[#1e2d2b] border-4 border-yellow-400 px-6 py-2 rounded-lg shadow-md text-center">
                    <p className="text-sm">
                        🎖️ Level: {farm.level} &nbsp;&nbsp; ✨ XP: {farm.xp} &nbsp;&nbsp; 🪙 Coins: {farm.coins}
                    </p>
                </div>
            </div>

            {/* Progression bâtiments */}
            <section className="mt-8 px-4">
                <h2 className="text-center text-yellow-200 text-lg mb-3">📈 Progression de la ferme</h2>
                <FarmProgressionPanel />
            </section>
        </div>
    );
};

export default Dashboard;
