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

interface LoginProps {
  show: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ show, onClose }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // ✅ Email/Password Login
  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      let result;
      try {
        result = await response.json();
      } catch (err) {
        const raw = await response.text();
        console.error('🧨 Non-JSON from /login:', raw);
        alert('Login failed — server returned HTML instead of JSON.');
        return;
      }

      if (response.ok) {
        alert(`Welcome back!`);
        onClose();
        navigate('/welcome');
      } else {
        alert(result.error || 'Login failed');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Login error:', error.message);
        alert('Login failed — ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google Sign In
  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      const user = result.user;

      const response = await fetch('http://localhost:5000/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          uid: user.uid
        })
      });

      let data;
      try {
        data = await response.json();
      } catch (err) {
        const raw = await response.text();
        console.error('🧨 Non-JSON from /google-login:', raw);
        alert('Google Login failed — server returned HTML instead of JSON.');
        return;
      }

      if (response.ok) {
        alert(`Welcome ${user.displayName || 'user'}! Signed in with Google.`);
        onClose();
        navigate('/welcome');
      } else {
        alert(data.error || 'Google login failed');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Google sign-in error:', error.message);
        alert('Google Sign-In failed — ' + error.message);
      }
    }
  };

  return (
    <ModalOverlay show={show}>
      <ModalBox>
        <LeftPanel>Welcome Back!</LeftPanel>
        <RightPanel>
          <Title>Login to Your Account</Title>
          <form onSubmit={handleLoginSubmit}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" disabled={loading}>
              {loading ? 'Logging In…' : 'Log In'}
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
              onClick={() => onClose()}
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

export default Login;
