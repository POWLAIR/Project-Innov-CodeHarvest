'use client';

import { useState } from 'react';

interface TerminalProps {
    logs: string[];
    clearLogs: () => void;
}

const Terminal = ({ logs, clearLogs }: TerminalProps) => {
    return (
        <div className="terminal-container glass-effect p-4 mt-6 rounded-xl text-white">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg">Terminal</h2>
                <button onClick={clearLogs} className="text-indigo-300 hover:text-indigo-200 text-sm">
                    Réinitialiser
                </button>
            </div>
            <div className="terminal-logs h-40 overflow-y-auto">
                {logs.length === 0 ? (
                    <p className="text-white/80">Aucun log</p>
                ) : (
                    logs.map((log, index) => <p key={index}>{log}</p>)
                )}
            </div>
        </div>
    );
};

export default Terminal;
