// payment.controll.ts
import { Request, Response } from 'express';
import crypto from 'crypto';
import sgMail from '@sendgrid/mail';
import { createRazorpayInstance } from '../config/razorpay.config';
import supabase from '../../../signupbackend/db'; // Correct path to Supabase client

const razorpayInstance = createRazorpayInstance();
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

// Create Order Function
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  const { courseId, amount, email, uid } = req.body;

  if (!courseId || !amount || !email || !uid) {
    res.status(400).json({
      success: false,
      message: 'Course ID, amount, email, and uid are required',
    });
    return;
  }

  const options = {
    amount: amount * 100, // Razorpay expects the amount in paise (1 INR = 100 paise)
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

      // Store order in Supabase
      const { data, error } = await supabase
        .from('payments')
        .insert([
          {
            order_id: order.id,
            amount,
            email,
            payment_id: '',
            uid,
          },
        ]);

      if (error) {
        console.error('Error inserting order into Supabase:', error);
        res.status(500).json({
          success: false,
          message: 'Failed to store order in database',
        });
        return;
      }

      // Cast data to any to bypass type checking error
      const paymentData = data as any;

      console.log('Order inserted into Supabase:', paymentData);

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

// Verify Payment Function
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
      // Update payment_id in Supabase
      const { data, error } = await supabase
        .from('payments')
        .update({ payment_id })
        .eq('order_id', order_id)
        .single(); // Use .single() to return a single row

      if (error) {
        console.error('DB error:', error);
        res.status(500).json({
          success: false,
          message: 'Error updating payment status',
        });
        return;
      }

      // Cast data to any to bypass type checking error
      const paymentData = data as any;

      // Send success email
      const userEmail = paymentData?.email;
      if (userEmail) {
        const msg = {
          to: userEmail,
          from: 'grid.pro11@gmail.com', // Replace with a valid email address
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
