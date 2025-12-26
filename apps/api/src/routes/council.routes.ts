import { Router } from 'express';
import { sendPrompt, getStatuses } from '../controllers/council.controller';

const router = Router();

// POST /api/council/prompt - Send prompt to specific AI
router.post('/prompt', sendPrompt);

// GET /api/council/status - Get status of all AIs
router.get('/status', getStatuses);

export default router;
