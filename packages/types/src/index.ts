// domain/mission.ts
export type MissionStatus = 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'FAILED';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface Mission {
  id: string;
  codeName: string;
  description: string;
  status: MissionStatus;
  priority: Priority;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

// domain/governance.ts
export type TeamDomain =
  | 'ENGINEERING'
  | 'FRONTEND'
  | 'GOVERNANCE'
  | 'OPS'
  | 'DESIGN'
  | 'RESEARCH'
  | 'QA'
  | 'REVENUE';

export interface AgentMember {
  id: string;
  name: string;
  domain: TeamDomain;
  capabilities: string[];
  vibeScore: number; // 0-100
  isLead: boolean;
}

export interface Team {
  id: string;
  name: string;
  domain: TeamDomain;
  members: AgentMember[];
  leadId?: string;
}

export interface Vote {
  id: string;
  voterId: string;
  candidateId: string;
  teamId: string;
  timestamp: string;
}

export type ErrorSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface ShieldaError {
  code: string;
  message: string;
  severity: ErrorSeverity;
  meta?: Record<string, unknown>;
}

export type Result<T, E = ShieldaError> = 
  | { ok: true; value: T }
  | { ok: false; error: E };

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ShieldaError;
  meta: {
    timestamp: string;
    requestId: string;
    runtime: string; // ms
    version: string;
  };
}
