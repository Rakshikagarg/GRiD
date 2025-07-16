import styled from 'styled-components';

export const InfoSec = styled.div`
  color: #fff;
  display: block; // ✅ overrides unwanted flex from parent
  padding: 160px 0;
  background: ${({ bgImage, lightBg }: { bgImage?: string; lightBg?: boolean }) =>
    bgImage
      ? `url(${bgImage}) center center / cover no-repeat`
      : lightBg
      ? '#fff'
      : '#101522'};
  position: relative;
  z-index: 1;
`;


export const InfoRow = styled.div`
  display: flex;
  margin: 0 -15px -15px -15px;
  flex-wrap: wrap;
  align-items: flex-start;
  flex-direction: ${({ imgStart }: { imgStart?: boolean }) =>
    imgStart ? 'row-reverse' : 'row'};
`;

export const InfoColumn = styled.div`
  margin-bottom: 15px;
  padding-right: 15px;
  padding-left: 15px;
  flex: 1;
  max-width: 50%;
  flex-basis: 50%;

  @media screen and (max-width: 1200px) {
    max-width: 100%;
    flex-basis: 100%;
    display: block;         // ✅ block instead of flex
    text-align: left;       // ✅ ensures left alignment
  }
`;

export const TextWrapper = styled.div`
  max-width: 540px;
  padding-top: 0;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;

  @media screen and (max-width: 1200px) {
    padding-bottom: 65px;
  }
`;


export const ImgWrapper = styled.div`
  max-width: 555px;
  display: flex;
  justify-content: ${({ start }: { start?: boolean }) =>
    start ? 'flex-start' : 'flex-end'};
`;

export const Img = styled.img`
  padding-right: 0;
  border: 0;
  max-width: 100%;
  vertical-align: middle;
  display: inline-block;
  max-height: 500px;
`;

export const TopLine = styled.div`
  color: ${({ lightTopLine }: { lightTopLine?: boolean }) =>
    lightTopLine ? '#a9b3c1' : '#4B59F7'};
  font-size: 18px;
  line-height: 16px;
  font-weight: 700;
  letter-spacing: 1.4px;
  margin-bottom: 16px;
`;

export const Heading = styled.h1`
  margin-bottom: 24px;
  font-size: 48px;
  line-height: 1.1;
  font-weight: 600;
  color: ${({ lightText }: { lightText?: boolean }) =>
    lightText ? '#f7f8fa' : '#1c2237'};
`;

export const Subtitle = styled.p`
  max-width: 440px;
  margin-bottom: 35px;
  font-size: 18px;
  line-height: 24px;
  color: ${({ lightTextDesc }: { lightTextDesc?: boolean }) =>
    lightTextDesc ? '#a9b3c1' : '#1c2237'};
`;
