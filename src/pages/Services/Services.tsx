import React from 'react';
import { InfoSection, Pricing } from '../../components';
import { homeObjOne, homeObjThree } from './Data';

const Services: React.FC = () => {
  return (
    <>
      <Pricing />
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjThree} />
    </>
  );
};

export default Services;
