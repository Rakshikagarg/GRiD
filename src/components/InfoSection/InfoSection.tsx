import React from 'react';
import {
  InfoSec,
  InfoRow,
  InfoColumn,
  TextWrapper,
  TopLine,
  Heading,
  Subtitle
} from './InfoSection.elements';
import { Container, Button } from '../../globalStyles';

interface InfoSectionProps {
  primary?: boolean;
  lightBg?: boolean;
  topLine: string;
  lightTopLine?: boolean;
  lightText?: boolean;
  lightTextDesc?: boolean;
  headline: string;
  description: string;
  buttonLabel: string;
  onButtonClick?: () => void;
  img?: string;
  alt: string;
  imgStart?: boolean;
}

const InfoSection: React.FC<InfoSectionProps> = ({
  primary,
  lightBg,
  topLine,
  lightTopLine,
  lightText,
  lightTextDesc,
  headline,
  description,
  buttonLabel,
  onButtonClick,
  img,
  alt,
  imgStart,
}) => {
  return (
    <InfoSec lightBg={lightBg} bgImage={img}>
      <Container>
        <InfoRow imgStart={imgStart}>
          <InfoColumn>
            <TextWrapper>
              <TopLine lightTopLine={lightTopLine}>{topLine}</TopLine>
              <Heading lightText={lightText}>{headline}</Heading>
              <Subtitle lightTextDesc={lightTextDesc}>{description}</Subtitle>
              <Button big fontBig primary={primary} onClick={onButtonClick}>
                {buttonLabel}
              </Button>
            </TextWrapper>
          </InfoColumn>
          {/* Removed duplicated image column to avoid background conflict */}
        </InfoRow>
      </Container>
    </InfoSec>
  );
};

export default InfoSection;
