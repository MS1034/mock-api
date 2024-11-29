import express from 'express';
import testRouter from './test.js'
import testAttemptRouter from './testAttempt.js'

const router = express.Router();

router.use('/test', testRouter);
router.use('/test-attempt', testAttemptRouter);

export default router;
