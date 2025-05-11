'use client';

import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    return (
        <header className="bg-[#101f1f] border-b-4 border-yellow-400 shadow-md font-pixel z-50">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
                {/* Logo & Titre */}
                <div className="flex items-center gap-3">
                    <Image
                        src="/codeharvest-logo.png"
                        alt="CodeHarvest"
                        width={32}
                        height={32}
                    />
                    <span className="text-yellow-200 text-xl tracking-wide">
                        CodeHarvest
                    </span>
                </div>

                {/* Liens de navigation */}
                <nav className="flex gap-6 text-yellow-100 text-sm">
                    <NavLink href="/dashboard" label="🌾 Ferme" />
                    <NavLink href="/market" label="🛒 Marché" />
                    <NavLink href="/inventory" label="🎒 Inventaire" />
                    <NavLink href="/profile" label="👤 Profil" />
                </nav>

                {/* Déconnexion / Avatar */}
                <div className="flex items-center gap-2">
                    <Image
                        src="/npc/npc-dog-lv1.png"
                        alt="Avatar"
                        width={28}
                        height={28}
                        className="rounded-full border-2 border-yellow-400"
                    />
                    <button
                        onClick={() => {
                            localStorage.removeItem('token');
                            window.location.href = '/login';
                        }}
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
