import { useState } from 'react';

interface AIConfig {
  name: string;
  title: string;
  subtitle: string;
  color: string;
}

interface AIPromptInputProps {
  ai: 'claude' | 'gemini' | 'codex';
  config: AIConfig;
  onSend: (ai: 'claude' | 'gemini' | 'codex', prompt: string) => Promise<void>;
  disabled?: boolean;
}

export function AIPromptInput({ ai, config, onSend, disabled }: AIPromptInputProps) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim() || isLoading || disabled) return;

    setIsLoading(true);
    try {
      await onSend(ai, prompt);
      setPrompt('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };

  return (
    <div
      className={`ai-box bg-dms-card`}
      style={{ borderColor: disabled ? '#374151' : config.color }}
    >
      {/* ASCII Box Header */}
      <div
        className="ascii-box p-3 text-center"
        style={{
          backgroundColor: disabled ? 'rgba(55, 65, 81, 0.1)' : `${config.color}10`,
          color: disabled ? '#6B7280' : config.color,
        }}
      >
        <div className="text-xs">┌────────────────────────────────────┐</div>
        <div className="font-bold text-sm">{config.title}</div>
        <div className="text-xs">{config.subtitle}</div>
        <div className="text-xs">└────────────────────────────────────┘</div>
      </div>

      {/* Input Area */}
      <div className="p-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || isLoading}
          placeholder={`Send prompt to ${config.name}... (Ctrl+Enter to send)`}
          className="w-full h-32 p-3 bg-dms-bg border border-dms-border rounded-lg text-dms-text placeholder:text-dms-muted resize-none focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            '--tw-ring-color': disabled ? '#374151' : config.color,
          } as React.CSSProperties}
        />

        <button
          onClick={handleSubmit}
          disabled={!prompt.trim() || isLoading || disabled}
          className="w-full mt-3 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: !prompt.trim() || isLoading || disabled ? '#374151' : config.color,
            color: '#000',
          }}
        >
          {isLoading ? 'Processing...' : `Send to ${config.name}`}
        </button>

        {disabled && (
          <p className="text-xs text-dms-muted mt-2 text-center">
            AI is offline
          </p>
        )}
      </div>
    </div>
  );
}
