import React, { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Page = styled.div`
  background: #f9f9f9;
  color: #222;
  min-height: 100vh;
  padding: 40px 20px;
  font-family: 'Segoe UI', sans-serif;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #666;
`;

const PlansWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  margin-top: 30px;
`;

const PlanCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  width: 320px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.06);
  border: 1px solid #e6e6e6;
`;

const PlanTitle = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 10px;
`;

const Price = styled.p`
  font-size: 1.2rem;
  color: ${({ free }: { free?: boolean }) => (free ? '#28a745' : '#ff9500')};
  margin-bottom: 20px;
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 25px;
`;

const FeatureItem = styled.li`
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  font-size: 0.95rem;

  &::before {
    content: '✔️';
    margin-right: 8px;
    color: #28a745;
  }
`;

const Button = styled.button<{ type: 'demo' | 'premium' }>`
  background-color: ${({ type }) => (type === 'demo' ? '#28a745' : '#ff9500')};
  color: white;
  font-weight: bold;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  width: 100%;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

const SignOutBtn = styled(Button)`
  background-color: #dc3545;
  color: white;
  width: auto;
  margin: 40px auto 0 auto;
  display: block;

  &:hover {
    background-color: #b02a37;
  }
`;

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const loadScript = (src: string) => {
    return new Promise<boolean>((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript('https://checkout.razorpay.com/v1/checkout.js');
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert('You have been signed out.');
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        console.error('Sign out error:', err);
        alert('Sign out failed: ' + err.message);
      } else {
        console.error('Unknown error:', err);
        alert('Sign out failed: An unknown error occurred.');
      }
    }
  };

const onPremiumSubscribe = async () => {
  try {
    const user = auth.currentUser;

    if (!user || !user.email) {
      alert('User email not found. Please log in again.');
      return;
    }

    const res = await axios.post('http://localhost:4000/api/createOrder', {
      courseId: 1,
      amount: 499,
      email: user.email,
    });

    const { order } = res.data;

    if (!order || !order.id) {
      alert('Order creation failed. Please try again.');
      return;
    }

    console.log("Razorpay Order:", order);

    const paymentObject = new window.Razorpay({
      key: 'rzp_test_QwSnDVvAZGNjT8',
      amount: order.amount,
      currency: order.currency,
      name: 'GRiD Learning',
      description: 'Premium Plan Subscription',
      order_id: order.id,
      handler: function (response) {
        const verifyData = {
          order_id: response.razorpay_order_id,
          payment_id: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        };

        axios.post('http://localhost:4000/api/verifyPayment', verifyData)
          .then((res) => {
            if (res?.data?.success) {
              alert('🎉 Payment Successful. Welcome to Premium!');
            } else {
              alert('Payment verification failed.');
            }
          })
          .catch((err) => {
            console.error('Verification error:', err);
            alert('Verification error occurred.');
          });
      },
      theme: {
        color: '#FF7F50',
      },
    });

    // Delay popup slightly to avoid race condition
    setTimeout(() => {
      paymentObject.open();
    }, 300);
    
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error('Axios error response:', err.response?.data);
      alert(err.response?.data?.message || 'Payment failed.');
    } else {
      console.error('Unknown error:', err);
      alert('Payment failed to start.');
    }
  }
};


  const onDemoStart = () => {
    alert('✅ Your 7-day demo access is now active!');
  };

  return (
    <Page>
      <Header>
        <Title>Explore GRiD Learning 🚀</Title>
        <Subtitle>Choose the best plan to grow your skills & career</Subtitle>
      </Header>

      <PlansWrapper>
        {/* Demo Plan */}
        <PlanCard>
          <PlanTitle>Demo Plan</PlanTitle>
          <Price free={true}>Free for 7 Days</Price>
          <FeatureList>
            <FeatureItem>Access to selected content</FeatureItem>
            <FeatureItem>Preview live sessions</FeatureItem>
            <FeatureItem>Join trial networking events</FeatureItem>
          </FeatureList>
          <Button type="demo" onClick={onDemoStart}>Start Free Trial</Button>
        </PlanCard>

        {/* Premium Plan */}
        <PlanCard>
          <PlanTitle>Premium Plan</PlanTitle>
          <Price>₹1 / 3 Months</Price>
          <FeatureList>
            <FeatureItem>Full access to all course sprints</FeatureItem>
            <FeatureItem>Live & recorded expert sessions</FeatureItem>
            <FeatureItem>Networking events & community</FeatureItem>
            <FeatureItem>Resume & CV mentoring</FeatureItem>
            <FeatureItem>User persona dashboard</FeatureItem>
            <FeatureItem>Completion certificates</FeatureItem>
          </FeatureList>
          <Button type="premium" onClick={onPremiumSubscribe}>Subscribe Now</Button>
        </PlanCard>
      </PlansWrapper>

      <SignOutBtn onClick={handleSignOut}>Sign Out</SignOutBtn>
    </Page>
  );
};

export default Welcome;
