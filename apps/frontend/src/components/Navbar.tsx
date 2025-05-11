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
        <header className="bg-[#101f1f]/90 backdrop-blur-md border-b-4 border-yellow-400 shadow-md font-pixel z-50 sticky top-0">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
                {/* Logo & Titre */}
                <Link href="/dashboard" className="flex items-center gap-3">
                    <Image
                        src="/codeharvest-logo.png"
                        alt="CodeHarvest"
                        width={32}
                        height={32}
                    />
                    <span className="text-yellow-200 text-xl tracking-wide hover:text-yellow-400 transition">
                        CodeHarvest
                    </span>
                </Link>

                {/* Liens de navigation */}
                <nav className="flex gap-6 text-yellow-100 text-sm">
                    <NavLink href="/dashboard" label="🌾 Ferme" />
                    <NavLink href="/quests" label="📜 Quêtes" />
                    <NavLink href="/profile" label="👤 Profil" />
                </nav>

                {/* Avatar + Déconnexion */}
                <div className="flex items-center gap-2">
                    <Image
                        src="/npc/npc-dog-lv1.png"
                        alt="Avatar"
                        width={28}
                        height={28}
                        className="rounded-full border-2 border-yellow-400"
                    />
                    <button
                        onClick={handleLogout}
                        className="text-yellow-300 hover:text-red-400 text-xs transition-colors duration-200"
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
        className="hover:text-yellow-400 transition-all duration-150"
    >
        {label}
    </Link>
);

export default Navbar;
