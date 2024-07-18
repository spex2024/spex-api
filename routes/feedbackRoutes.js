import { Router } from 'express';
import {
    addVendor,
    createFeedback,
    deleteFeedback, deleteVendor,
    getFeedback,
    getFeedbackById,
    healthCheck,
    updateFeedback, vendorFeedback
} from "../controller/feedback.js";


const router = Router();

router.post('/create', createFeedback);
router.post('/update', updateFeedback);
router.post('/add-vendor', addVendor);
router.get('/feedback', getFeedback);
router.get('/vendor', vendorFeedback);
router.get('/feedback/:id', getFeedbackById);
router.delete('/feedback/:id', deleteFeedback);
router.delete('/vendor/:id', deleteVendor);
router.get('/healthcheck', healthCheck);

export default router;