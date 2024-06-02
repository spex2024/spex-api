import { Router } from 'express';
import { register, login, logout, profile } from '../controller/auth.js';
import {requireAuth} from "../middleware/requireAuth.js";


const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.get('/profile', requireAuth, profile); // Apply middleware here

export default router;
