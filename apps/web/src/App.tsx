import { useState } from 'react';
import { CouncilStatus } from './components/CouncilStatus';
import { AIPromptInput } from './components/AIPromptInput';
import { AIResponseBox } from './components/AIResponseBox';
import { useAICouncil } from './hooks/useAICouncil';
import { AI_CONFIG, APP_CONFIG } from './config/ai.config';

interface AIResponse {
  id: string;
  ai: 'claude' | 'gemini' | 'codex';
  title: string;
  content: string;
  timestamp: Date;
  color: string;
}

function App() {
  const [responses, setResponses] = useState<AIResponse[]>([]);
  const { statuses, sendPrompt } = useAICouncil();

  const handleSendPrompt = async (ai: 'claude' | 'gemini' | 'codex', prompt: string) => {
    const result = await sendPrompt(ai, prompt);
    if (result) {
      const newResponse: AIResponse = {
        id: Date.now().toString(),
        ai,
        title: `${AI_CONFIG[ai].title} — ${AI_CONFIG[ai].subtitle}`,
        content: result,
        timestamp: new Date(),
        color: AI_CONFIG[ai].color,
      };
      setResponses((prev) => [newResponse, ...prev]);
    }
  };

  return (
    <div className="min-h-screen bg-dms-bg text-dms-text p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-2 tracking-tight">
            {APP_CONFIG.title}
          </h1>
          <p className="text-xl text-dms-muted">{APP_CONFIG.subtitle}</p>
          <div className="mt-4 text-sm text-dms-muted">
            <span className="text-claude">■</span> CLAUDE (General)&nbsp;
            <span className="text-gemini">■</span> GEMINI (Engineer)&nbsp;
            <span className="text-codex">■</span> CODEX (Analyst)
          </div>
        </header>

        {/* Council Status */}
        <CouncilStatus statuses={statuses} />

        {/* Prompt Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {(Object.keys(AI_CONFIG) as Array<keyof typeof AI_CONFIG>).map((ai) => (
            <AIPromptInput
              key={ai}
              ai={ai}
              config={AI_CONFIG[ai]}
              onSend={handleSendPrompt}
              disabled={statuses[ai] !== 'online'}
            />
          ))}
        </div>

        {/* Responses */}
        {responses.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-claude via-gemini to-codex rounded-full"></span>
              Council Responses
            </h2>
            <div className="space-y-6">
              {responses.map((response) => (
                <AIResponseBox key={response.id} response={response} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
