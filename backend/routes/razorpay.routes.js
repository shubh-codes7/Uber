import { Router } from 'express';
import { createOrder, verifyPayment } from '../controllers/razorpay.controller.js';

const razorpayRouter = Router();

razorpayRouter.post('/create-order', createOrder);
razorpayRouter.post('/verify', verifyPayment);

export default razorpayRouter;