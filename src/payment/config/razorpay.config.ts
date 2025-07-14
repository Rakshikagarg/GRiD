import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

export const createRazorpayInstance = (): Razorpay => {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new Error('Razorpay credentials are not set in environment variables');
  }

  return new Razorpay({
    key_id,
    key_secret,
  });
};
