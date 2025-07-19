// payment.routes.ts
import { Router } from 'express';
import { createOrder, verifyPayment } from '../control/payment.controll'; // Correct the import path

const router = Router();

// Define routes for payment-related operations
router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);

export default router;
