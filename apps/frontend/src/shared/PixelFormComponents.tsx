// shared/PixelFormComponents.tsx
'use client';

import React from 'react';

export const PixelInput = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
        {...props}
        className="w-full border-4 border-yellow-500 px-3 py-2 rounded-sm bg-yellow-100 text-black font-mono text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-400"
    />
);

export const PixelButton = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        {...props}
        className="bg-yellow-500 border-4 border-yellow-700 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded pixel-font uppercase transition"
    >
        {children}
    </button>
);
