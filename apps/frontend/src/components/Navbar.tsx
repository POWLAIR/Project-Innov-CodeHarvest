'use client';

import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-4 bg-green-600 text-white">
            <Link href="/dashboard" className="font-bold text-xl">CodeHarvest</Link>
            <div className="space-x-4">
                <Link href="/dashboard/settings">Paramètres</Link>
                <Link href="/dashboard/profile">Profil</Link>
            </div>
        </nav>
    );
};

export default Navbar;
