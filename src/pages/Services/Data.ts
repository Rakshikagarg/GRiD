export interface HomeObj {
  lightBg: boolean;
  lightText: boolean;
  lightTextDesc: boolean;
  topLine: string;
  headline: string;
  description: string;
  buttonLabel: string;
  imgStart: boolean;  // Updated to boolean
  img: string;
  alt: string;
}

export const homeObjOne: HomeObj = {
  lightBg: false,
  lightText: true,
  lightTextDesc: true,
  topLine: 'Exclusive Access',
  headline: 'Unlimited Transactions with zero fees',
  description:
    'Get access to our exclusive diamond card that allows you to send unlimited transactions without getting charged any fees',
  buttonLabel: 'Get Started',
  imgStart: false,  // Set as boolean
  img: require('../../images/svg-1.svg'),
  alt: 'Credit Card'
};

export const homeObjTwo: HomeObj = {
  lightBg: false,
  lightText: true,
  lightTextDesc: true,
  topLine: '100% Secure',
  headline: 'Stay protected 24/7 anywhere anytime',
  description:
    'We have you covered no matter where you are located. Over 140 locations worldwide to ensure you have access anytime',
  buttonLabel: 'Learn More',
  imgStart: false,  // Set as boolean
  img: require('../../images/svg-1.svg'),
  alt: 'Vault'
};

export const homeObjThree: HomeObj = {
  lightBg: true,
  lightText: false,
  lightTextDesc: false,
  topLine: 'Easy Setup',
  headline: 'Super fast and simple onboarding process',
  description:
    "Get everything set up and ready in under 10 minutes. All you need to do is add your information and you're ready to go.",
  buttonLabel: 'Start Now',
  imgStart: true,  // Set as boolean
  img: require('../../images/svg-1.svg'),
  alt: 'Vault'
};

export const homeObjFour: HomeObj = {
  lightBg: false,
  lightText: true,
  lightTextDesc: true,
  topLine: 'Data Analytics',
  headline: 'Every transaction is stored on our secure cloud database',
  description:
    'Never ever have to worry again about saved receipts. We store your data, so you can access it anytime.',
  buttonLabel: 'Sign Up Now',
  imgStart: true,  // Set as boolean
  img: require('../../images/svg-1.svg'),
  alt: 'Vault'
};
