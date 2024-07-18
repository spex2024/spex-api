import { Router } from 'express';
import {
    addVendor,
    createFeedback,
    deleteFeedback,
    getFeedback,
    getFeedbackById,
    healthCheck,
    updateFeedback, vendorFeedback
} from "../controller/feedback.js";


const router = Router();

router.post('/create', createFeedback);
router.post('/update', updateFeedback);
router.post('/vendor', addVendor);
router.get('/feedback', getFeedback);
router.get('/vendor', vendorFeedback);
router.get('/feedback/:id', getFeedbackById);
router.delete('/feedback/:id', deleteFeedback);
router.get('/healthcheck', healthCheck);

export default router;