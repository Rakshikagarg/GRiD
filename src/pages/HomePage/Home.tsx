/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { InfoSection, Pricing } from '../../components';
import { homeObjOne, homeObjThree, homeObjTwo, homeObjFour } from './Data'; // Correct import
import BgImage from '../../images/bg.jpeg';  // Not necessary if you import homeObj

const Home: React.FC = () => {
  return (
    <>
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjThree} />
      <InfoSection {...homeObjTwo} />
      <Pricing />
      <InfoSection {...homeObjFour} />
    </>
  );
};

export default Home;
