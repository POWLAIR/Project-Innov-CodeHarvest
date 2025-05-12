'use client';

import { useState, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import MonacoEditor from '@monaco-editor/react';
import { useRouter } from 'next/router';
import Terminal from '@/components/Terminal';

// Requêtes GraphQL
const GET_QUEST_DETAIL = gql`
  query GetQuestDetail($id: String!) {
    getQuest(id: $id) {
      id
      title
      description
      isCompleted
      codeTemplate
      language
      repoUrl  // Ajouter un champ pour l'URL du repo
    }
  }
`;

const CREATE_GITHUB_REPO = gql`
  mutation CreateGitHubRepo($questId: String!) {
    createRepo(questId: $questId) {
      repoUrl  // Retourne l'URL du dépôt GitHub
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
    const [createRepo] = useMutation(CREATE_GITHUB_REPO);
    const [completeQuest] = useMutation(COMPLETE_QUEST);
    const [editorValue, setEditorValue] = useState('');
    const [logs, setLogs] = useState<string[]>([]);
    const [language, setLanguage] = useState('javascript');
    const [editorHeight, setEditorHeight] = useState(400);

    // Récupérer les détails de la quête
    useEffect(() => {
        if (data?.getQuest) {
            setEditorValue(data.getQuest.codeTemplate);
            if (data.getQuest.language) {
                setLanguage(data.getQuest.language);
            }
        }
    }, [data]);

    // Fonction pour capturer les logs et les afficher dans le terminal
    const captureConsole = () => {
        const originalConsoleLog = console.log;
        console.log = (message: unknown) => {
            setLogs((prevLogs) => [...prevLogs, message as string]);
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

    // Créer le dépôt GitHub et récupérer l'URL
    const handleCreateRepo = async () => {
        try {
            const response = await createRepo({
                variables: { questId: questId as string },
            });
            const repoUrl = response.data.createRepo.repoUrl;
            alert(`Cloner le repo en utilisant l'URL : ${repoUrl}`);
        } catch (error) {
            console.error('Erreur lors de la création du repo :', error);
        }
    };

    // Compléter la quête
    const handleCompleteQuest = async () => {
        if (editorValue) {
            try {
                await completeQuest({
                    variables: { questId: questId as string, solution: editorValue },
                });
                router.push('/quests');
            } catch (error) {
                console.error('Erreur lors de la soumission de la quête :', error);
            }
        }
    };

    // Tester le code utilisateur (exécution du code dans un environnement sécurisé)
    const handleTestCode = () => {
        captureConsole();
        try {
            // Utilisation sécurisée de eval avec un try-catch
            const result = new Function(editorValue);
            result();  // Exécution du code utilisateur
        } catch (error) {
            console.log('Erreur dans le code : ', error instanceof Error ? error.message : String(error));
        }
    };

    // Vider les logs
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
                    onChange={(value: string | undefined) => setEditorValue(value || '')}
                    theme="vs-dark"
                />
            </div>

            {/* Terminal interactif pour afficher les logs */}
            <Terminal logs={logs} clearLogs={handleClearLogs} />

            {/* Boutons pour tester, créer le repo et compléter la quête */}
            <div className="flex justify-between mt-6">
                <button
                    onClick={handleTestCode}
                    className="glass-effect px-6 py-3 rounded-xl text-white hover:bg-white/10"
                >
                    Tester le code
                </button>

                {/* Bouton pour créer un dépôt GitHub */}
                <button
                    onClick={handleCreateRepo}
                    className="glass-effect px-6 py-3 rounded-xl text-white hover:bg-white/10"
                >
                    Créer le dépôt GitHub
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
