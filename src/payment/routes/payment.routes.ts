import express from 'express';
import { createOrder, verifyPayment } from '../control/payment.controll';

const router = express.Router();

router.post('/createOrder', createOrder);
router.post('/verifyPayment', verifyPayment);

export default router;
