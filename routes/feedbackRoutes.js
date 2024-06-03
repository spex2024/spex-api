import { Router } from 'express';
import {createFeedback, deleteFeedback, getFeedback, getFeedbackById, healthCheck} from "../controller/feedback.js";


const router = Router();

router.post('/create', createFeedback);
router.get('/feedback', getFeedback);
router.delete('/feedback/:id', getFeedbackById);
router.delete('/feedback/:id', deleteFeedback);
router.get('/healthcheck', healthCheck);

export default router;