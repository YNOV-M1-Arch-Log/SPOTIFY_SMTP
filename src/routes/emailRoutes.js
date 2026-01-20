import express from 'express';
import { sendAlertLogin } from '../controllers/emailController.js';

const router = express.Router();

router.post('/alert-login', sendAlertLogin);

export default router;
