'use client';

import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { getFarmElementsByLevel } from '../../lib/farmElements';

interface Props {
    level?: number;
}

const FarmMap = ({ level = 1 }: Props) => {
    const elements = getFarmElementsByLevel(level);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
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

    return (
        <div
            ref={containerRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            className="relative w-full h-[600px] overflow-hidden border-4 border-yellow-600 rounded-xl shadow-xl cursor-grab"
        >
            <motion.div
                className="relative w-full h-full"
                animate={controls}
                style={{ scale, x: position.x, y: position.y }}
                transition={{ type: 'spring', stiffness: 150, damping: 30 }}
            >
                {/* Background */}
                <Image
                    src="/background/farm-lv1.png"
                    alt="Farm background"
                    fill
                    className="z-0 object-cover"
                />

                {/* Farm elements dynamiques */}
                {elements.map((element) => (
                    <motion.div
                        key={element.id}
                        className={`${element.style} cursor-pointer`}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => alert(element.alt)}
                    >
                        <Image
                            src={element.image}
                            alt={element.alt}
                            width={96}
                            height={96}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default FarmMap;
