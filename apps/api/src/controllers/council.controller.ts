import { Request, Response } from 'express';
import { execSync } from 'child_process';
import { logger } from '@repo/logger';

interface CouncilPromptRequest {
  ai: 'claude' | 'gemini' | 'codex';
  prompt: string;
}

// AI Configuration
const AI_CONFIG = {
  claude: {
    name: 'CLAUDE',
    color: '#FF8700',
    online: true, // Claude is always available (we're running in it)
  },
  gemini: {
    name: 'GEMINI',
    color: '#005F00',
    command: (prompt: string) =>
      `gemini "${prompt.replace(/"/g, '\\"')}" --include-directories /c/Users/Administrator/DeadMan_Structure`,
  },
  codex: {
    name: 'CODEX',
    color: '#00FFFF',
    command: (prompt: string) =>
      `codex exec "${prompt.replace(/"/g, '\\"')}" --skip-git-repo-check -C /c/Users/Administrator/DeadMan_Structure`,
  },
};

export async function sendPrompt(req: Request<{}, {}, CouncilPromptRequest>, res: Response) {
  const { ai, prompt } = req.body;

  if (!ai || !prompt) {
    return res.status(400).json({ error: 'Missing ai or prompt' });
  }

  if (!['claude', 'gemini', 'codex'].includes(ai)) {
    return res.status(400).json({ error: 'Invalid AI. Use: claude, gemini, or codex' });
  }

  logger.info({ ai, promptLength: prompt.length }, 'Council prompt received');

  try {
    let response: string;

    switch (ai) {
      case 'claude':
        // Claude is the current session - return acknowledgment
        response = `[THE GENERAL - CLAUDE OPUS 4.5]\n\nPrompt received: "${prompt}"\n\nThis is a simulated response from within the Claude Code session. In a full implementation, this would trigger actual Claude reasoning.\n\nStatus: ONLINE and ready for directives.`;
        break;

      case 'gemini': {
        const command = AI_CONFIG.gemini.command(prompt);
        logger.info({ command: 'gemini' }, 'Executing Gemini CLI');
        try {
          response = execSync(command, { encoding: 'utf-8', timeout: 60000 });
        } catch (error: any) {
          response = `Gemini Error: ${error.message || 'Unknown error'}`;
          logger.error({ error }, 'Gemini CLI failed');
        }
        break;
      }

      case 'codex': {
        const command = AI_CONFIG.codex.command(prompt);
        logger.info({ command: 'codex' }, 'Executing Codex CLI');
        try {
          response = execSync(command, { encoding: 'utf-8', timeout: 120000 });
        } catch (error: any) {
          response = `Codex Error: ${error.message || 'Unknown error'}`;
          logger.error({ error }, 'Codex CLI failed');
        }
        break;
      }

      default:
        return res.status(400).json({ error: 'Unknown AI' });
    }

    res.json({ response, ai, timestamp: new Date().toISOString() });
  } catch (error) {
    logger.error({ error }, 'Council prompt error');
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getStatuses(req: Request, res: Response) {
  const statuses: Record<string, { online: boolean; name: string; color: string }> = {
    claude: { online: true, name: AI_CONFIG.claude.name, color: AI_CONFIG.claude.color },
    gemini: { online: true, name: AI_CONFIG.gemini.name, color: AI_CONFIG.gemini.color },
    codex: { online: true, name: AI_CONFIG.codex.name, color: AI_CONFIG.codex.color },
  };

  res.json(statuses);
}
