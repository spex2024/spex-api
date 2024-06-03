import { Router } from 'express';
import {createFeedback, deleteFeedback, getFeedback, healthCheck} from "../controller/feedback.js";


const router = Router();

router.post('/create', createFeedback);
router.get('/feedback', getFeedback);
router.get('/feedback/:id', deleteFeedback);
router.get('/healthcheck', healthCheck);

export default router;