'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { FarmElement, getFarmElements } from '../../lib/farmElements';
import FarmInteractionPanel from './FarmInteractionPanel';
import { Farm } from '../types/farm';

interface Props {
    farm: Farm;
    setFarm: (updated: Farm) => void;
    notify: (message: string) => void;
}

const FarmMap = ({ farm, setFarm, notify }: Props) => {
    const [selectedElement, setSelectedElement] = useState<FarmElement | null>(null);
    // const [upgradedElementId, setUpgradedElementId] = useState<string | null>(null);
    // const controls = useAnimation();
    // const containerRef = useRef<HTMLDivElement>(null);

    const elements = getFarmElements(farm);

    // Grouper les éléments par type pour les îles
    const elementsByType = {
        buildings: elements.filter(e => e.type === 'building'),
        fields: elements.filter(e => e.type === 'field'),
        trees: elements.filter(e => e.type === 'tree'),
        npcs: elements.filter(e => e.type === 'npc')
    };

    const islandVariants = {
        hover: {
            y: -10,
            transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse" as const,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className="relative w-full min-h-[800px] overflow-hidden">
            {/* Fond avec effet parallaxe */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 to-purple-900">
                <div className="absolute inset-0 opacity-30">
                    <Image
                        src="/background/stars.png"
                        alt="Stars"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Container des îles */}
            <div className="relative w-full h-full flex items-center justify-center gap-8 p-8">
                {/* Île principale (bâtiments) */}
                <motion.div
                    variants={islandVariants}
                    whileHover="hover"
                    className="relative glass-effect rounded-2xl p-6 min-w-[300px] min-h-[200px]"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 to-transparent rounded-2xl" />
                    <h3 className="text-white mb-4 text-center">🏠 Bâtiments</h3>
                    <div className="relative flex justify-center items-center gap-4">
                        {elementsByType.buildings.map((element) => (
                            <motion.div
                                key={element.id}
                                className="hover-scale cursor-pointer"
                                whileHover={{ scale: 1.1 }}
                                onClick={() => setSelectedElement(element)}
                            >
                                <Image
                                    src={element.image}
                                    alt={element.alt}
                                    width={80}
                                    height={80}
                                    className="drop-shadow-lg"
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Île des champs */}
                <motion.div
                    variants={islandVariants}
                    whileHover="hover"
                    className="relative glass-effect rounded-2xl p-6 min-w-[250px] min-h-[180px]"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-500/20 to-transparent rounded-2xl" />
                    <h3 className="text-white mb-4 text-center">🌾 Cultures</h3>
                    <div className="relative flex justify-center items-center">
                        {elementsByType.fields.map((element) => (
                            <motion.div
                                key={element.id}
                                className="hover-scale cursor-pointer"
                                whileHover={{ scale: 1.1 }}
                                onClick={() => setSelectedElement(element)}
                            >
                                <Image
                                    src={element.image}
                                    alt={element.alt}
                                    width={80}
                                    height={80}
                                    className="drop-shadow-lg"
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Île de la nature */}
                <motion.div
                    variants={islandVariants}
                    whileHover="hover"
                    className="relative glass-effect rounded-2xl p-6 min-w-[250px] min-h-[180px]"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-green-500/20 to-transparent rounded-2xl" />
                    <h3 className="text-white mb-4 text-center">🌳 Nature</h3>
                    <div className="relative flex justify-center items-center">
                        {elementsByType.trees.map((element) => (
                            <motion.div
                                key={element.id}
                                className="hover-scale cursor-pointer"
                                whileHover={{ scale: 1.1 }}
                                onClick={() => setSelectedElement(element)}
                            >
                                <Image
                                    src={element.image}
                                    alt={element.alt}
                                    width={80}
                                    height={80}
                                    className="drop-shadow-lg"
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Île des animaux */}
                <motion.div
                    variants={islandVariants}
                    whileHover="hover"
                    className="relative glass-effect rounded-2xl p-6 min-w-[250px] min-h-[180px]"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-transparent rounded-2xl" />
                    <h3 className="text-white mb-4 text-center">🐾 Animaux</h3>
                    <div className="relative flex justify-center items-center">
                        {elementsByType.npcs.map((element) => (
                            <motion.div
                                key={element.id}
                                className="hover-scale cursor-pointer"
                                whileHover={{ scale: 1.1 }}
                                onClick={() => setSelectedElement(element)}
                            >
                                <Image
                                    src={element.image}
                                    alt={element.alt}
                                    width={80}
                                    height={80}
                                    className="drop-shadow-lg"
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {selectedElement && (
                <FarmInteractionPanel
                    element={selectedElement}
                    onClose={() => setSelectedElement(null)}
                    onUpgrade={async () => {
                        const key = `${selectedElement.type === 'field' ? 'corn' : selectedElement.type}Level` as keyof Farm;
                        setFarm({ ...farm, [key]: (farm[key] as number) + 1 });
                        notify(`${selectedElement.alt} amélioré au niveau ${(farm[key] as number) + 1} !`);
                    }}
                />
            )}
        </div>
    );
};

export default FarmMap;