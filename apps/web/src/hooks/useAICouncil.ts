import { useState, useCallback } from 'react';
import { AIStatus } from '../types';

export function useAICouncil() {
  const [statuses, setStatuses] = useState<Record<string, AIStatus>>({
    claude: 'online',
    gemini: 'online',
    codex: 'online',
  });

  const sendPrompt = useCallback(async (ai: string, prompt: string): Promise<string | null> => {
    // Update status to processing
    setStatuses((prev) => ({ ...prev, [ai]: 'processing' }));

    try {
      const response = await fetch('/api/council/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ai, prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error(`Error sending prompt to ${ai}:`, error);
      return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    } finally {
      // Reset status to online
      setStatuses((prev) => ({ ...prev, [ai]: 'online' }));
    }
  }, []);

  return { statuses, sendPrompt };
}
