'use client';

import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { FarmElement, getFarmElements } from '../../lib/farmElements';
import FarmInteractionPanel from './FarmInteractionPanel';
import { Farm } from '../types/farm';

interface Props {
    farm: Farm;
    setFarm: (updated: Farm) => void;
    notify: (message: string) => void
}

const FarmMap = ({ farm, setFarm }: Props) => {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [selectedElement, setSelectedElement] = useState<FarmElement | null>(null);
    const [upgradedElementId, setUpgradedElementId] = useState<string | null>(null);
    const controls = useAnimation();
    const containerRef = useRef<HTMLDivElement>(null);

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setScale((prev) => Math.min(Math.max(prev + delta, 0.8), 2));
    };

    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        setPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
        lastX = e.clientX;
        lastY = e.clientY;
    };

    const handleMouseUp = () => {
        isDragging = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const elements = getFarmElements(farm);

    return (
        <div
            ref={containerRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            className="relative w-full h-[600px] overflow-hidden rounded-2xl glass-effect"
        >
            <motion.div
                className="relative w-full h-full"
                animate={controls}
                style={{ scale, x: position.x, y: position.y }}
                transition={{ type: 'spring', stiffness: 150, damping: 30 }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-600/20" />
                <Image
                    src="/background/base.png"
                    alt="Farm background"
                    fill
                    className="z-0 object-cover opacity-90"
                />

                {elements.map((element: FarmElement) => (
                    <motion.div
                        key={element.id}
                        className={`${element.style} cursor-pointer hover-scale`}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setSelectedElement(element)}
                    >
                        <Image
                            src={element.image}
                            alt={element.alt}
                            width={element.width}
                            height={element.height}
                            className="drop-shadow-lg"
                        />
                        {upgradedElementId === element.id && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: -20 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 1 }}
                                className="absolute left-1/2 transform -translate-x-1/2 text-emerald-300 text-sm font-pixel glow"
                            >
                                +1 niveau !
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </motion.div>

            {selectedElement && (
                <FarmInteractionPanel
                    element={selectedElement}
                    onClose={() => setSelectedElement(null)}
                    onUpgrade={async () => {
                        const key = `${selectedElement.type === 'field' ? 'corn' : selectedElement.type}Level` as keyof Farm;
                        setFarm({ ...farm, [key]: (farm[key] as number) + 1 });
                        setUpgradedElementId(selectedElement.id);
                        setTimeout(() => setUpgradedElementId(null), 2000);
                    }}
                />
            )}
        </div>
    );
};

export default FarmMap;