'use client';

import { useState, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import MonacoEditor from '@monaco-editor/react';
import { useRouter } from 'next/router';
import Terminal from '@/components/Terminal';  // Assurez-vous d'importer le terminal

const GET_QUEST_DETAIL = gql`
  query GetQuestDetail($id: String!) {
    getQuest(id: $id) {
      id
      title
      description
      isCompleted
      codeTemplate
      language
    }
  }
`;

const COMPLETE_QUEST = gql`
  mutation CompleteQuest($questId: String!, $solution: String!) {
    completeQuest(questId: $questId, solution: $solution) {
      id
      isCompleted
    }
  }
`;

const QuestDetailPage = () => {
    const router = useRouter();
    const { questId } = router.query;
    const { data, loading, error } = useQuery(GET_QUEST_DETAIL, {
        variables: { id: questId },
    });
    const [completeQuest] = useMutation(COMPLETE_QUEST);
    const [editorValue, setEditorValue] = useState('');
    const [logs, setLogs] = useState<string[]>([]);
    const [language, setLanguage] = useState('javascript');
    const [editorHeight, setEditorHeight] = useState(400);

    useEffect(() => {
        if (data?.getQuest) {
            setEditorValue(data.getQuest.codeTemplate);
            if (data.getQuest.language) {
                setLanguage(data.getQuest.language);
            }
        }
    }, [data]);

    // Fonction pour capturer les logs et afficher dans le terminal
    const captureConsole = () => {
        const originalConsoleLog = console.log;
        console.log = (message: any) => {
            setLogs((prevLogs) => [...prevLogs, message]);
            originalConsoleLog(message);
        };
    };

    // Mettre à jour la hauteur de l'éditeur selon la taille de l'écran
    useEffect(() => {
        const updateHeight = () => {
            setEditorHeight(window.innerHeight - 200);
        };

        window.addEventListener('resize', updateHeight);
        updateHeight(); // Appel initial

        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    const handleCompleteQuest = async () => {
        if (editorValue) {
            await completeQuest({
                variables: { questId: questId as string, solution: editorValue },
            });
            router.push('/quests');
        }
    };

    const handleTestCode = () => {
        captureConsole();
        try {
            eval(editorValue);  // Utilisation de eval pour exécuter le code (à éviter en production)
        } catch (error) {
            if (error instanceof Error) {
                console.log('Erreur dans le code : ' + error.message);
            } else {
                console.log('Erreur dans le code : ' + String(error));
            }
        }
    };

    const handleClearLogs = () => {
        setLogs([]);
    };

    if (loading) return <p>Chargement de la quête...</p>;
    if (error) return <p>Erreur lors du chargement de la quête</p>;

    const quest = data?.getQuest;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-semibold text-white mb-6">{quest?.title}</h1>
            <p className="text-white/80 mb-6">{quest?.description}</p>

            {/* Monaco Editor pour résoudre la quête */}
            <div className="mb-6">
                <MonacoEditor
                    height={editorHeight}
                    language={language}
                    value={editorValue}
                    onChange={(value) => setEditorValue(value || '')}
                />
            </div>

            {/* Terminal interactif pour afficher les logs */}
            <Terminal logs={logs} clearLogs={handleClearLogs} />

            {/* Boutons pour tester et compléter la quête */}
            <div className="flex justify-between mt-6">
                <button
                    onClick={handleTestCode}
                    className="glass-effect px-6 py-3 rounded-xl text-white hover:bg-white/10"
                >
                    Tester le code
                </button>

                <button
                    onClick={handleCompleteQuest}
                    className="glass-effect px-6 py-3 rounded-xl text-white hover:bg-white/10"
                >
                    Compléter la quête
                </button>
            </div>
        </div>
    );
};

export default QuestDetailPage;
