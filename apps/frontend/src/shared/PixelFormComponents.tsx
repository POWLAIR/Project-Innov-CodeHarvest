'use client';

import React from 'react';

export const PixelInput = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
        {...props}
        className="w-full glass-effect px-4 py-3 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
    />
);

export const PixelButton = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        {...props}
        className="glass-effect hover:bg-white/10 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover-scale disabled:opacity-50 disabled:cursor-not-allowed"
    >
        {children}
    </button>
);