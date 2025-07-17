/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';

import {
  ModalOverlay,
  ModalBox,
  LeftPanel,
  RightPanel,
  Input,
  Button,
  Title,
  GoogleButton,
  OrSeparator
} from './styles';

interface SignUpProps {
  show: boolean;
  onClose: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ show, onClose }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // ✅ Email/Password Sign Up
  const handleSignUpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: email.toLowerCase().trim(), password })
      });

      let result;
      try {
        result = await response.json();
      } catch (err) {
        const raw = await response.text();
        console.error('🧨 Non-JSON from /signup:', raw);
        alert('Signup failed — server returned HTML instead of JSON.');
        return;
      }

      if (response.ok) {
        alert(`Welcome ${name}! Your account has been created.`);
        onClose();
        setName('');
        setEmail('');
        setPassword('');
        navigate('/welcome');
      } else if (response.status === 409 && result.error === 'Email already registered') {
        alert('An account with this email already exists. Please log in instead.');
      } else {
        alert(result.error || 'Signup failed');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Signup error:', error);
        alert('Signup failed — ' + error.message);
      } else {
        console.error('Unknown error:', error);
        alert('Signup failed — Unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google Sign Up
  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      const user = result.user;

      const response = await fetch('http://localhost:5000/google-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          uid: user.uid
        })
      });

      let data;
      try {
        data = await response.json();
      } catch (err) {
        const raw = await response.text();
        console.error('🧨 Non-JSON from /google-signup:', raw);
        alert('Google Sign-Up failed — server returned HTML instead of JSON.');
        return;
      }

      if (response.ok) {
        // ✅ Send welcome email explicitly after Google signup
        await fetch('http://localhost:5000/send-confirmation-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: user.displayName,
            email: user.email,
            firebase_uid: user.uid
          })
        });

        alert(`Welcome ${user.displayName || 'user'}! Signed in with Google.`);
        onClose();
        navigate('/welcome');
      } else if (response.status === 409) {
        alert('This account is already registered.');
      } else {
        alert(data.error || 'Google signup failed');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Google sign-in error:', error);
        alert('Google Sign-In failed — ' + error.message);
      } else {
        console.error('Unknown error:', error);
        alert('Google Sign-In failed — Unknown error');
      }
    }
  };

  return (
    <ModalOverlay show={show}>
      <ModalBox>
        <LeftPanel>
          Let's Get Started!
        </LeftPanel>
        <RightPanel>
          <Title>Create an Account</Title>
          <form onSubmit={handleSignUpSubmit}>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" disabled={loading}>
              {loading ? 'Signing Up…' : 'Sign Up'}
            </Button>

            <OrSeparator>or</OrSeparator>

            <GoogleButton type="button" onClick={handleGoogleSignIn}>
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                style={{ width: '20px', height: '20px' }}
              />
              Sign in with Google
            </GoogleButton>

            <Button
              type="button"
              onClick={onClose}
              disabled={loading}
              style={{ backgroundColor: '#999' }}
            >
              Cancel
            </Button>
          </form>
        </RightPanel>
      </ModalBox>
    </ModalOverlay>
  );
};

export default SignUp;
