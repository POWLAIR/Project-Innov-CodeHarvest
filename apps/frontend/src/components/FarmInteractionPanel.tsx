'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FarmElement } from '../../lib/farmElements';
import { useMutation, gql } from '@apollo/client';

interface FarmInteractionPanelProps {
    element: FarmElement | null;
    onClose: () => void;
    onUpgrade: () => void;
}

// GraphQL mutation complète
const UPGRADE_BUILDING = gql`
  mutation UpgradeFarmBuilding($building: String!) {
    upgradeFarmBuilding(building: $building) {
      level
      xp
      coins
      cornLevel
      barnLevel
      treeLevel
      npcLevel
      chickenLevel
      cowLevel
      sheepLevel
    }
  }
`;

const FarmInteractionPanel = ({ element, onClose, onUpgrade }: FarmInteractionPanelProps) => {
    const buildingKey = element?.type === 'field'
        ? 'cornLevel'
        : element?.type
            ? `${element.type}Level`
            : null;

    const [upgradeBuilding, { loading }] = useMutation(UPGRADE_BUILDING, {
        variables: buildingKey ? { building: buildingKey } : undefined,
        onCompleted: () => {
            onUpgrade();
            onClose();
        },
        onError: (err) => console.error('Erreur d’amélioration:', err),
    });

    return (
        <AnimatePresence>
            {element && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#1e2d2b] border-4 border-yellow-400 text-yellow-100 font-pixel px-6 py-4 rounded-xl shadow-lg z-30"
                >
                    <h2 className="text-lg mb-2">{element.alt}</h2>
                    <p>Type : {element.type}</p>
                    <p>Niveau : {element.level}</p>

                    <button
                        className="mt-3 bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-300 disabled:opacity-50"
                        onClick={() => upgradeBuilding()}
                        disabled={loading || !buildingKey}
                    >
                        {loading ? 'Amélioration...' : 'Améliorer'}
                    </button>

                    <button
                        className="mt-3 ml-2 text-yellow-300 hover:text-red-400 text-sm"
                        onClick={onClose}
                    >
                        Fermer
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FarmInteractionPanel;
