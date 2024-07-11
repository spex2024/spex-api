import { Router } from 'express';
import {
    createFeedback,
    deleteFeedback,
    getFeedback,
    getFeedbackById,
    healthCheck,
    updateFeedback
} from "../controller/feedback.js";


const router = Router();

router.post('/create', createFeedback);
router.post('/update', updateFeedback);
router.get('/feedback', getFeedback);
router.get('/feedback/:id', getFeedbackById);
router.delete('/feedback/:id', deleteFeedback);
router.get('/healthcheck', healthCheck);

export default router;