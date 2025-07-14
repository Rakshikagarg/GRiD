import styled from 'styled-components';

interface ButtonProps {
  bgColor?: string;
}

interface ModalOverlayProps {
  show: boolean;
}

export const ModalOverlay = styled.div<ModalOverlayProps>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalBox = styled.div`
  display: flex;
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 800px;
  height: 500px;
  overflow: hidden;
`;

export const LeftPanel = styled.div`
  flex: 1;
  background-color: #3c098f;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 32px;
  font-weight: bold;
  padding: 20px;
  text-align: center;
`;

export const RightPanel = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const Button = styled.button<ButtonProps>`
  width: 100%;
  padding: 12px;
  background-color: ${({ bgColor }) => bgColor || '#3c098f'};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: ${({ bgColor }) => (bgColor === '#aaa' ? '#888' : '#2d076e')};
  }
`;
export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 24px;
  margin-top: -12px; /* pushes title a bit upwards */
`;

export const OrSeparator = styled.div`
  text-align: center;
  margin: 12px 0;
  color: #666;
  font-weight: 500;
`;

export const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background: #fff;
  color: #444;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  width: 100%;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 16px;
  transition: background 0.2s ease;

  &:hover {
    background: #f5f5f5;
  }

  img {
    width: 18px;
    height: 18px;
  }
`;
