import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcrypt';
import pool from './db'; 
import sgMail from '@sendgrid/mail';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

// Log the pool object to ensure it's initialized correctly
console.log(pool);

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error running query', err);
  } else {
    console.log('Database connected at:', res.rows[0]);
  }
});

// ✅ Reusable welcome email sender
const sendWelcomeEmail = async (email: string, name: string): Promise<void> => {
  try {
    console.log(`Sending welcome email to ${name} at ${email}`);
    await sgMail.send({
      to: email,
      from: process.env.FROM_EMAIL || '',
      subject: '🎉 Welcome to GRiD!',
      html: `<h1>Welcome to GRiD, ${name}!</h1><p>We’re thrilled to have you onboard 🚀</p>`
    });
    console.log('✅ Welcome email sent to:', email);
  } catch (err: any) {
    console.error('❌ SendGrid email error:', err.response?.body || err.message);
  }
};

// ➤ SIGN UP ROUTE
app.post('/signup', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email.toLowerCase().trim();
  const password = req.body.password;

  try {
    const exists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (exists.rows.length > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, NOW())',
      [name, email, hashedPassword]
    );

    await sendWelcomeEmail(email, name);
    console.log('📥 New user registered:', email);
    res.status(200).json({ message: 'User saved to PostgreSQL' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Server error during sign-up' });
  }
});

// ➤ GOOGLE SIGNUP ROUTE
app.post('/google-signup', async (req, res) => {
  const name = req.body.name;
  const rawEmail = req.body.email;
  const email = rawEmail.toLowerCase().trim();
  const uid = req.body.uid;

  if (!email || !uid || !name) {
    return res.status(400).json({ error: 'Missing user info from Google' });
  }

  try {
    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (existing.rows.length > 0) {
      console.log('❌ Google account already registered:', email);
      return res.status(409).json({ error: 'Google account already registered. Please log in instead.' });
    }

    await pool.query(
      'INSERT INTO users (name, email, password, firebase_uid, created_at) VALUES ($1, $2, $3, $4, NOW())',
      [name, email, null, uid]
    );

    await sendWelcomeEmail(email, name);
    console.log('✅ New Google user saved:', email);

    res.status(200).json({ message: 'Google user created successfully' });
  } catch (err) {
    console.error('Google signup error:', err);
    res.status(500).json({ error: 'Server error during Google signup' });
  }
});

// ➤ LOGIN ROUTE
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const ADMIN_EMAIL = 'grid.pro11@gmail.com';
  const ADMIN_PASSWORD = 'admin123';

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.status(200).json({ message: 'Admin login successful', role: 'admin' });
  }

  try {
    const userRes = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = userRes.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'Email not found' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Login successful', name: user.name, role: 'user' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// ➤ GOOGLE LOGIN ROUTE
app.post('/google-login', async (req, res) => {
  console.log('✅ Received Google login request');
  const { email, uid } = req.body;

  if (!email || !uid) {
    return res.status(400).json({ error: 'Missing email or UID' });
  }

  try {
    const userRes = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND firebase_uid = $2',
      [email, uid]
    );

    const user = userRes.rows[0];

    if (!user) {
      return res.status(403).json({
        error: 'Google account not registered. Please sign up first.'
      });
    }

    res.status(200).json({ message: 'Login successful', name: user.name });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ error: 'Server error during Google login' });
  }
});

// ✅ ➤ SEND WELCOME EMAIL AFTER LOGIN 
app.post('/send-confirmation-email', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Missing name or email' });
  }

  try {
    await sendWelcomeEmail(email, name);
    res.status(200).json({ message: 'Welcome email sent successfully' });
  } catch (err) {
    console.error('Error sending welcome email:', err);
    res.status(500).json({ error: 'Failed to send welcome email' });
  }
});

// ➤ HEALTH CHECK ROUTE
app.get('/health', async (req, res) => {
  try {
    const db = await pool.query('SELECT NOW()');
    res.status(200).json({
      status: '✅ Server is healthy',
      dbTime: db.rows[0].now,
      version: '1.0.0',
      uptime: process.uptime(),
      message: 'GRiD backend and database are operational.'
    });
  } catch (err: any) {
    console.error('❌ Health check DB error:', err);
    res.status(500).json({
      status: '❌ Server is running but DB check failed',
      error: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
