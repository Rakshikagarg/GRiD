import styled from 'styled-components';

// ModalOverlay component with inferred types for `show` prop
export const ModalOverlay = styled.div<{ show: boolean }>`
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

// ModalBox component (no need to pass any props here, so no issues with types)
export const ModalBox = styled.div`
  display: flex;
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 800px;
  height: 500px;
  overflow: hidden;
`;

// LeftPanel component (no props, so no issues with types)
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

// RightPanel component (no props, so no issues with types)
export const RightPanel = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// Input component (no issues with types here, as no props are used)
export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

// Button component - TypeScript will now infer bgColor as optional string (or undefined)
export const Button = styled.button<{ bgColor?: string }>`
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

// Title component (no issues with types)
export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

// GoogleButton component (no issues with types)
export const GoogleButton = styled.button`
  background-color: white;
  color: #444;
  font-weight: 500;
  border: 1px solid #ccc;
  padding: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 10px;
  transition: background 0.3s;

  img {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

// OrSeparator component (no issues with types)
export const OrSeparator = styled.div`
  text-align: center;
  margin: 15px 0;
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
`;
