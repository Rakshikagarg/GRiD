import { Request, Response } from 'express';
import crypto from 'crypto';
import { createRazorpayInstance } from '../config/razorpay.config';
import pool from '../../../signupbackend/db'; // PostgreSQL connection
import sgMail from '@sendgrid/mail';

const razorpayInstance = createRazorpayInstance();
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

type RazorpayOrderOptions = {
  amount: number;
  currency: string;
  receipt: string;
};

// Create Razorpay Order
// Create Razorpay Order
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  const { courseId, amount, email } = req.body;

  if (!courseId || !amount || !email) {
    res.status(400).json({
      success: false,
      message: 'Course ID, amount, and email are required',
    });
    return;
  }

  const options: RazorpayOrderOptions = {
    amount: amount * 100, // in paise
    currency: 'INR',
    receipt: `receipt_order_${Date.now()}`,
  };

  try {
    razorpayInstance.orders.create(options, async (err: any, order: any) => {
      if (err || !order) {
        console.error('Error creating order:', err);
        res.status(500).json({
          success: false,
          message: 'Failed to create order',
        });
        return;
      }

      // Store order in DB
      await pool.query(
        `INSERT INTO payments (order_id, course_id, amount, email, status) VALUES ($1, $2, $3, $4, 'pending')`,
        [order.id, courseId, amount, email]
      );

      res.status(200).json({
        success: true,
        order,
      });
    });
  } catch (error) {
    console.error('Exception in createOrder:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

// Verify Razorpay Payment
export const verifyPayment = async (req: Request, res: Response): Promise<void> => {
  const { order_id, payment_id, signature } = req.body;

  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    res.status(500).json({
      success: false,
      message: 'Razorpay secret is not set',
    });
    return;
  }

  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(order_id + '|' + payment_id);
  const generatedSignature = hmac.digest('hex');

  if (generatedSignature === signature) {
    try {
      const result = await pool.query(
        `UPDATE payments SET payment_id = $1, signature = $2, status = 'paid' WHERE order_id = $3 RETURNING email`,
        [payment_id, signature, order_id]
      );

      const userEmail = result.rows[0]?.email;

      if (userEmail) {
        const msg = {
          to: userEmail,
          from: 'your@email.com', // replace with verified sender
          subject: 'Payment Successful',
          text: 'Your payment was successfully received. Thank you for your purchase!',
        };
        await sgMail.send(msg);
      }

      res.status(200).json({
        success: true,
        message: 'Payment verified and email sent',
      });
    } catch (err) {
      console.error('DB/email error:', err);
      res.status(500).json({
        success: false,
        message: 'Payment verified, but DB/email failed',
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Payment signature mismatch',
    });
  }
};
