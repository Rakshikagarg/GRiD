import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sgMail from '@sendgrid/mail';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

// ✅ Welcome Email Function
const sendWelcomeEmail = async (email: string, name: string): Promise<void> => {
  try {
    await sgMail.send({
      to: email,
      from: process.env.FROM_EMAIL || '',
      subject: '🎉 Welcome to GRiD! 🎓',
      html: `<h1>Welcome to GRiD, ${name}!</h1><p>We’re thrilled to have you onboard 🚀</p>`
    });
    console.log('✅ Welcome email sent to:', email);
  } catch (err: any) {
    console.error('❌ Email error:', err.response?.body || err.message);
  }
};

// ➤ SIGN UP (No password column)
app.post('/signup', async (req, res) => {
  const { name, email } = req.body;
  const trimmedEmail = email.toLowerCase().trim();

  try {
    const { data: exists, error: checkError } = await supabase
      .from('Users')
      .select('*')
      .eq('email', trimmedEmail);

    if (checkError) throw checkError;
    if (exists.length > 0) return res.status(409).json({ error: 'Email already registered' });

    // Insert user into Users table with a unique uid (email can also be used as uid)
    const { error: insertError } = await supabase.from('Users').insert([
      { 
        name, 
        email: trimmedEmail, 
        uid: trimmedEmail, // Use email as uid or a unique identifier
        createdAt: new Date(), // Set createdAt to current timestamp
        updatedAt: new Date()  // Set updatedAt to current timestamp
      }
    ]);

    if (insertError) throw insertError;
    await sendWelcomeEmail(trimmedEmail, name);
    res.status(200).json({ message: 'User created successfully' });
  } catch (err: any) {
    console.error('Signup error:', err.message || err);
    res.status(500).json({ error: 'Signup failed' });
  }
});

// ➤ GOOGLE SIGNUP (Ensure `firebase_uid` is inserted as `uid`)
app.post('/google-signup', async (req, res) => {
  const { name, email, uid } = req.body;
  const trimmedEmail = email.toLowerCase().trim();

  try {
    const { data: exists, error: checkError } = await supabase
      .from('Users')
      .select('*')
      .eq('email', trimmedEmail);

    if (checkError) throw checkError;
    if (exists.length > 0) return res.status(409).json({ error: 'Google account already registered' });

    // Insert user into Users table with firebase_uid as uid (avoid null uid issue)
    const { error: insertError } = await supabase.from('Users').insert([
      { 
        name, 
        email: trimmedEmail, 
        firebase_uid: uid, 
        uid: uid,  // Ensure `uid` is populated with `firebase_uid`
        createdAt: new Date(), // Set createdAt to current timestamp
        updatedAt: new Date()  // Set updatedAt to current timestamp
      }
    ]);

    if (insertError) throw insertError;
    await sendWelcomeEmail(trimmedEmail, name);
    res.status(200).json({ message: 'Google user created successfully' });
  } catch (err: any) {
    console.error('Google signup error:', err.message || err);
    res.status(500).json({ error: 'Google signup failed' });
  }
});

// ➤ LOGIN (No password check)
app.post('/login', async (req, res) => {
  const { email } = req.body;

  try {
    const { data, error } = await supabase
      .from('Users')
      .select('*')
      .eq('email', email);

    if (error) throw error;
    const user = data[0];

    if (!user) return res.status(404).json({ error: 'Email not found' });

    // No password check needed as no password is stored
    res.status(200).json({ message: 'Login successful', name: user.name, role: 'user' });
  } catch (err: any) {
    console.error('Login error:', err.message || err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// ➤ GOOGLE LOGIN (Only firebase_uid check)
app.post('/google-login', async (req, res) => {
  const { email, uid } = req.body;

  try {
    const { data, error } = await supabase
      .from('Users')
      .select('*')
      .eq('email', email)
      .eq('firebase_uid', uid);

    if (error) throw error;
    const user = data[0];

    if (!user) return res.status(403).json({ error: 'Google account not registered' });
    res.status(200).json({ message: 'Login successful', name: user.name });
  } catch (err: any) {
    console.error('Google login error:', err.message || err);
    res.status(500).json({ error: 'Google login failed' });
  }
});

// ➤ SEND CONFIRMATION EMAIL
app.post('/send-confirmation-email', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Missing name or email' });

  try {
    await sendWelcomeEmail(email, name);
    res.status(200).json({ message: 'Confirmation email sent' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// ➤ HEALTH CHECK
app.get('/health', async (req, res) => {
  try {
    const { data, error } = await supabase.rpc('now');
    if (error) throw error;
    res.status(200).json({ status: 'OK', dbTime: data });
  } catch (err: any) {
    console.error('Health check failed:', err);
    res.status(500).json({ error: 'Database unreachable' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
