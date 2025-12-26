export type AIStatus = 'online' | 'offline' | 'processing';

export interface AIResponse {
  id: string;
  ai: 'claude' | 'gemini' | 'codex';
  title: string;
  content: string;
  timestamp: Date;
  color: string;
}

export interface AIConfig {
  name: string;
  title: string;
  subtitle: string;
  color: string;
}
