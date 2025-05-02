'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';

const Dashboard = () => {

    useEffect(() => {
        // Auth check (à améliorer avec un context ou middleware)
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        }
    }, []);

    return (
        <div className="p-4">
            <Navbar />
            <h1 className="text-2xl font-bold mb-4">Bienvenue dans ta ferme 🌾</h1>

            <section className="mb-4">
                <h2 className="text-lg font-semibold">Niveau : ...</h2>
                <p>XP : ...</p>
                <p>Pièces : ...</p>
            </section>

            <section>
                <h2 className="text-lg font-semibold">Quêtes en cours</h2>
                <ul>
                    <li>– Ramasser 10 carottes</li>
                    <li>– Vendre 5 œufs</li>
                </ul>
            </section>
        </div>
    );
};

export default Dashboard;
