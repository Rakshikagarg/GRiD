interface HomeObj {
  lightBg: boolean;
  lightText: boolean;
  lightTopLine?: boolean;
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
  lightTopLine: true,
  lightTextDesc: true,
  topLine: 'View Our Products',
  headline: 'Shop through our catalog of products',
  description:
    'We provide worldwide shipping to all countries. If there are any issues, just issue a refund and we will process your request',
  buttonLabel: 'Shop Now',
  imgStart: false,  // Updated to boolean
  img: require('../../images/svg-1.svg'),
  alt: 'Credit Card'
};

export const homeObjTwo: HomeObj = {
  lightBg: true,
  lightText: false,
  lightTopLine: false,
  lightTextDesc: false,
  topLine: '100% Secure',
  headline: 'Stay protected 24/7 anywhere anytime',
  description:
    'We have you covered no matter where you are located. Over 140 locations worldwide to ensure you have access anytime',
  buttonLabel: 'Learn More',
  imgStart: true,  // Updated to boolean
  img: require('../../images/svg-2.svg'),
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
  imgStart: true,  // Updated to boolean
  img: require('../../images/svg-1.svg'),
  alt: 'Vault'
};

export const homeObjFour: HomeObj = {
  lightBg: false,
  lightText: true,
  lightTextDesc: true,
  topLine: 'DATA ANALYTICS',
  headline: 'Every transaction is stored on our secure cloud database',
  description:
    'Never ever have to worry again about saved receipts. We store your data, so you can access it anytime.',
  buttonLabel: 'Sign Up Now',
  imgStart: true,  // Updated to boolean
  img: require('../../images/svg-1.svg'),
  alt: 'Vault'
};
