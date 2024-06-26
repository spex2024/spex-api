import { Router } from 'express';
import {register, login, logout, profile} from "../controller/auth.js";

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.get('/profile', profile);

export default router;