import { AIStatus } from '../types';

const STATUS_CONFIG = {
  claude: {
    name: 'CLAUDE',
    title: 'THE GENERAL',
    color: '#FF8700',
    borderColor: 'border-claude',
    bgColor: 'bg-claude/10',
    textColor: 'text-claude',
  },
  gemini: {
    name: 'GEMINI',
    title: 'THE ENGINEER',
    color: '#005F00',
    borderColor: 'border-gemini',
    bgColor: 'bg-gemini/10',
    textColor: 'text-gemini',
  },
  codex: {
    name: 'CODEX',
    title: 'THE ANALYST',
    color: '#00FFFF',
    borderColor: 'border-codex',
    bgColor: 'bg-codex/10',
    textColor: 'text-codex',
  },
} as const;

interface CouncilStatusProps {
  statuses: Record<string, AIStatus>;
}

export function CouncilStatus({ statuses }: CouncilStatusProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
      {Object.entries(STATUS_CONFIG).map(([ai, config]) => {
        const status = statuses[ai];
        const isOnline = status === 'online';

        return (
          <div
            key={ai}
            className={`ai-box ${config.borderColor} bg-dms-card`}
            style={{ borderColor: config.color }}
          >
            {/* ASCII Box Header */}
            <div className={`ascii-box p-3 ${config.bgColor}`} style={{ color: config.color }}>
              <div className="text-xs">┌────────────────────────────────────┐</div>
              <div className="text-center font-bold">
                {config.name} — {config.title}
              </div>
              <div className="text-xs">└────────────────────────────────────┘</div>
            </div>

            {/* Status Indicator */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isOnline ? 'animate-pulse' : ''
                  }`}
                  style={{
                    backgroundColor: isOnline ? config.color : '#374151',
                  }}
                />
                <span className="font-medium">{config.name}</span>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  isOnline ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                }`}
              >
                {isOnline ? 'ONLINE' : 'OFFLINE'}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
