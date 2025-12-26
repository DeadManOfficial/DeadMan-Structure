import { AIResponse as AIResponseType } from '../types';

interface AIResponseBoxProps {
  response: AIResponseType;
}

export function AIResponseBox({ response }: AIResponseBoxProps) {
  const formatContent = (text: string) => {
    // Simple markdown-like formatting
    return text
      .split('\n')
      .map((line, i) => {
        // Code blocks
        if (line.startsWith('```')) {
          return null;
        }
        // Headers
        if (line.startsWith('#')) {
          return (
            <div key={i} className="font-bold text-lg mt-4 mb-2">
              {line.replace(/^#+\s*/, '')}
            </div>
          );
        }
        // Bullet points
        if (line.trim().startsWith('-')) {
          return (
            <div key={i} className="ml-4">
              • {line.trim().replace(/^-\s*/, '')}
            </div>
          );
        }
        // Regular line
        return line ? (
          <p key={i} className="mb-2">
            {line}
          </p>
        ) : (
          <br key={i} />
        );
      })
      .filter(Boolean);
  };

  const timeStr = new Date(response.timestamp).toLocaleTimeString();

  return (
    <div
      className="ai-box bg-dms-card"
      style={{ borderColor: response.color }}
    >
      {/* ASCII Box Header */}
      <div
        className="ascii-box p-3"
        style={{
          backgroundColor: `${response.color}10`,
          color: response.color,
        }}
      >
        <div className="text-xs">┌──────────────────────────────────────────────────┐</div>
        <div className="text-center">
          <span className="font-bold">{response.title}</span>
          <span className="text-xs ml-4 opacity-70">{timeStr}</span>
        </div>
        <div className="text-xs">└──────────────────────────────────────────────────┘</div>
      </div>

      {/* Response Content */}
      <div className="p-4">
        <div className="ai-response text-dms-text">
          {formatContent(response.content)}
        </div>
      </div>
    </div>
  );
}
