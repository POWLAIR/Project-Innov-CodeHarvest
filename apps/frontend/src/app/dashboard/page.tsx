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

        const hasSeenWelcome = localStorage.getItem('welcomeShown');
        if (!hasSeenWelcome && farm?.level === 1) {
            setShowWelcome(true);
            localStorage.setItem('welcomeShown', 'true');
        }
    }, [farm]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center relative">
                <div className="absolute inset-0 pixel-pattern" />
                <div className="glass-effect p-6 rounded-xl text-white">
                    Chargement de la ferme...
                </div>
            </div>
        );
    }

    if (!farm) {
        return (
            <div className="min-h-screen flex items-center justify-center relative">
                <div className="absolute inset-0 pixel-pattern" />
                <div className="glass-effect p-6 rounded-xl text-white">
                    🚧 Aucune ferme trouvée pour cet utilisateur.
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative">
            <div className="absolute inset-0 pixel-pattern" />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-600/20" />
            <div className="relative z-10">
                <HUD />
                <Navbar />

                {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}

                <main className="container mx-auto px-4 space-y-8">
                    <section>
                        <FarmMap farm={farm} setFarm={setFarm} notify={addNotification} />
                    </section>

                    <section className="flex justify-center">
                        <div className="glass-effect px-8 py-4 rounded-xl text-white space-x-6">
                            <span className="text-lg">🎖️ Niveau {farm.level}</span>
                            <span className="text-lg">✨ XP: {farm.xp}</span>
                            <span className="text-lg">🪙 Pièces: {farm.coins}</span>
                        </div>
                    </section>

                    <section className="pb-8">
                        <h2 className="text-center text-white text-2xl font-semibold mb-6">
                            📈 Progression de la ferme
                        </h2>
                        <FarmProgressionPanel />
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;