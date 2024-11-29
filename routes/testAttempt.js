import express from 'express';
import { getTestAttempt, startTestAttempt } from '../controllers/testAttempt.js';
const router = express.Router();

router.get('/:id', getTestAttempt);
router.post('/:id', startTestAttempt);

export default router;
