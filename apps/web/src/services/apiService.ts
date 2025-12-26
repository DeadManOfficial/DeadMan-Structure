const API_BASE = '/api';

export const apiService = {
  async sendPrompt(ai: string, prompt: string): Promise<{ response: string }> {
    const response = await fetch(`${API_BASE}/council/prompt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ai, prompt }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
  },

  async getStatuses(): Promise<Record<string, 'online' | 'offline'>> {
    const response = await fetch(`${API_BASE}/council/status`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  },
};
