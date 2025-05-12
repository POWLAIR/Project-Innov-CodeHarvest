'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <header className="glass-effect sticky top-0 z-50 px-4 py-3 mb-6">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center gap-3 hover-scale">
                    <Image
                        src="/codeharvest-logo.png"
                        alt="CodeHarvest"
                        width={40}
                        height={40}
                        className="rounded-xl glow"
                    />
                    <span className="text-white text-xl font-semibold tracking-wide">
                        CodeHarvest
                    </span>
                </Link>

                <nav className="flex gap-6">
                    <NavLink href="/dashboard" label="🌾 Ferme" />
                    <NavLink href="/quests" label="📜 Quêtes" />
                    <NavLink href="/profile" label="👤 Profil" />
                </nav>

                <div className="flex items-center gap-4">
                    <Image
                        src="/npc/npc-dog-lv1.png"
                        alt="Avatar"
                        width={32}
                        height={32}
                        className="rounded-full glass-effect p-1"
                    />
                    <button
                        onClick={handleLogout}
                        className="text-red-300 hover:text-red-400 text-sm transition-colors duration-200 hover-scale"
                    >
                        Déconnexion
                    </button>
                </div>
            </div>
        </header>
    );
};

const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
        href={href}
        className="text-white/80 hover:text-white transition-all duration-150 hover-scale"
    >
        {label}
    </Link>
);

export default Navbar;