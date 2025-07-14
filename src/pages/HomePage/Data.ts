import BgImage from '../../images/bg.jpeg';

export const homeObjOne = {
  primary: true,
  lightBg: false,
  lightTopLine: true,
  lightText: true,
  lightTextDesc: true,
  topLine: 'Welcome to GRiD',
  headline: 'Lead Generation Specialist for Online Businesses',
  description:
    'We help business owners increase their revenue. Our team of unique specialists can help you achieve your business goals.',
  buttonLabel: 'Get Started',
  imgStart: true,  // Changed to boolean
  img: BgImage,
  alt: 'Credit Card',
  start: ''
};

export const homeObjTwo = {
  primary: true,
  lightBg: false,
  lightTopLine: true,
  lightText: true,
  lightTextDesc: true,
  topLine: 'Instant Setup',
  headline: 'Extremely quick onboarding process',
  description:
    "Once you've joined, our team of specialists will reach out to you and get you set up in minutes.",
  buttonLabel: 'Learn More',
  imgStart: true,  // Changed to boolean
  img: require('../../images/svg-2.svg'),
  alt: 'Vault',
  start: ''
};

export const homeObjThree = {
  primary: false,
  lightBg: true,
  lightTopLine: false,
  lightText: false,
  lightTextDesc: false,
  topLine: 'Sarah Jeni',
  headline:
    'Ultra helped me increase my revenue by over 3X in less than 3 months!',
  description:
    "Their team is wonderful! I can't believe I didn't start working with them earlier.",
  buttonLabel: 'View Case Study',
  imgStart: true,  // Changed to boolean
  img: require('../../images/profile.jpg'),
  alt: 'Vault',
  start: 'true'
};

export const homeObjFour = {
  primary: true,
  lightBg: false,
  lightTopLine: true,
  lightText: true,
  lightTextDesc: true,
  topLine: 'Secure Database',
  headline: 'All your data is stored on our secure server',
  description:
    'You will never have to worry about your information getting leaked. Our team of security experts will ensure your records are kept safe.',
  buttonLabel: 'Sign Up Now',
  imgStart: true,  // Changed to boolean
  img: require('../../images/svg-3.svg'),
  alt: 'Vault',
  start: 'true'
};
