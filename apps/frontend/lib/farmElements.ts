// lib/farmElements.ts

export type FarmElement = {
  id: string;
  type: 'building' | 'field' | 'tree' | 'npc';
  level: number;
  image: string;
  alt: string;
  style: string; // Tailwind CSS classes for positioning
  width: number;
  height: number;
  onClick?: () => void; // Optional interaction
};

type FarmLevelConfig = {
  level: number;
  elements: FarmElement[];
};

// Static configuration for each farm level
export const farmLevels: FarmLevelConfig[] = [
  {
    level: 1,
    elements: [
      {
        id: 'field-1',
        type: 'field',
        level: 1,
        image: '/field/field-level1.png',
        alt: 'Champ niveau 1',
        style: 'absolute bottom-16 left-20 z-10',
        width: 96,
        height: 96,
      },
      {
        id: 'barn-1',
        type: 'building',
        level: 1,
        image: '/buildings/barn-lv1.png',
        alt: 'Grange niveau 1',
        style: 'absolute bottom-24 right-32 z-10',
        width: 96,
        height: 96,
      },
      {
        id: 'tree-1',
        type: 'tree',
        level: 1,
        image: '/trees/tree-lv1.png',
        alt: 'Arbre décoratif',
        style: 'absolute bottom-28 left-60 z-0',
        width: 96,
        height: 96,
      },
      {
        id: 'dog-1',
        type: 'npc',
        level: 1,
        image: '/npc/npc-dog-lv1.png',
        alt: 'Corgi',
        style: 'absolute bottom-20 right-56 z-20',
        width: 96,
        height: 96,
      },
    ],
  },
  // Add more levels as needed
];

// Helper to get elements by farm level
export function getFarmElementsByLevel(level: number): FarmElement[] {
  return farmLevels.find((lvl) => lvl.level === level)?.elements || [];
}
