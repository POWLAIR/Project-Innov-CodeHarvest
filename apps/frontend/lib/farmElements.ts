// lib/farmElements.ts

export type FarmElement = {
  id: string;
  type: 'building' | 'field' | 'tree' | 'npc';
  level: number;
  image: string;
  alt: string;
  style: string;
  width: number;
  height: number;
};

export function getFarmElements(farm: {
  level: number;
  cornLevel: number;
  barnLevel: number;
  treeLevel: number;
  npcLevel: number;
}): FarmElement[] {
  const elements: FarmElement[] = [];

  // Field
  elements.push({
    id: 'field',
    type: 'field',
    level: farm.cornLevel,
    image: `/field/field-level${farm.cornLevel}.png`,
    alt: `Champ niveau ${farm.cornLevel}`,
    style: 'absolute bottom-16 left-20 z-10',
    width: 96,
    height: 96,
  });

  // Barn
  elements.push({
    id: 'barn',
    type: 'building',
    level: farm.barnLevel,
    image: `/buildings/barn-lv${farm.barnLevel}.png`,
    alt: `Grange niveau ${farm.barnLevel}`,
    style: 'absolute bottom-24 right-32 z-10',
    width: 96,
    height: 96,
  });

  // Tree
  elements.push({
    id: 'tree',
    type: 'tree',
    level: farm.treeLevel,
    image: `/trees/tree-lv${farm.treeLevel}.png`,
    alt: `Arbre décoratif niveau ${farm.treeLevel}`,
    style: 'absolute bottom-28 left-60 z-0',
    width: 96,
    height: 96,
  });

  // NPC
  elements.push({
    id: 'dog',
    type: 'npc',
    level: farm.npcLevel,
    image: `/npc/npc-dog-lv${farm.npcLevel}.png`,
    alt: `Corgi niveau ${farm.npcLevel}`,
    style: 'absolute bottom-20 right-56 z-20',
    width: 96,
    height: 96,
  });

  return elements;
}
