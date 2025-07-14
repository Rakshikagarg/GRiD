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

// Type definition for the props
interface InfoSectionProps {
  primary?: boolean;               // Determines the button style (primary or not)
  lightBg?: boolean;               // Determines background light/dark
  topLine: string;                 // The top line text
  lightTopLine?: boolean;          // Determines the light color for the top line
  lightText?: boolean;             // Determines if heading text is light
  lightTextDesc?: boolean;         // Determines if subtitle text is light
  headline: string;                // Main headline text
  description: string;             // Description under the headline
  buttonLabel: string;             // Button label text
  onButtonClick?: () => void;      // Button click handler
  img?: string;                    // Image URL for background image
  alt: string;                     // Alt text for the image
  imgStart?: boolean;              // Determines if the image is on the left or right side
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
          <InfoColumn>
            {img && <img src={img} alt={alt} />} {/* Optional image */}
          </InfoColumn>
        </InfoRow>
      </Container>
    </InfoSec>
  );
};

export default InfoSection;
