import express from 'express';
import { getTestById } from '../controllers/test.js'
const router = express.Router();


router.get('/:id', getTestById);

export default router;
