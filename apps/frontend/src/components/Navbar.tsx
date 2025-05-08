'use client';

import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    return (
        <header className="bg-[#0f1c1c] border-b-4 border-yellow-400 shadow-lg z-50 font-pixel">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
                {/* Logo + titre */}
                <div className="flex items-center gap-3">
                    <Image src="/codeharvest-logo.png" alt="CodeHarvest" width={32} height={32} />
                    <h1 className="text-yellow-100 text-xl">CodeHarvest</h1>
                </div>

                {/* Navigation links */}
                <nav className="flex gap-6 text-yellow-200 text-sm">
                    <Link
                        href="/dashboard"
                        className="hover:text-yellow-400 transition-all duration-200"
                    >
                        Ferme
                    </Link>
                    <Link
                        href="/market"
                        className="hover:text-yellow-400 transition-all duration-200"
                    >
                        Marché
                    </Link>
                    <Link
                        href="/inventory"
                        className="hover:text-yellow-400 transition-all duration-200"
                    >
                        Inventaire
                    </Link>
                    <Link
                        href="/profile"
                        className="hover:text-yellow-400 transition-all duration-200"
                    >
                        Profil
                    </Link>
                </nav>

                {/* Logout / profil rapide */}
                <div className="flex items-center gap-3">
                    <Image src="/assets/dog-corgi.png" alt="User" width={28} height={28} />
                    <button
                        onClick={() => {
                            localStorage.removeItem('token');
                            window.location.href = '/login';
                        }}
                        className="text-yellow-300 hover:text-red-400 text-xs"
                    >
                        Déconnexion
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
