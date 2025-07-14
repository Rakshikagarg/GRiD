import styled from 'styled-components';

export const Nav = styled.nav`
  background: #6470c8ff;
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const LogoLeft = styled.img`
  height: 70px;
`;

export const LogoRightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const LogoRight = styled.img`
  height: 90px;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const HamburgerIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.ul<{ click: boolean }>`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;

  @media screen and (max-width: 768px) {
    display: ${({ click }) => (click ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 80px;
    right: 0;
    background: #2E3A8F;
    width: 100%;
    height: calc(100vh - 80px);
    z-index: 100;
  }
`;

export const NavItem = styled.li`
  height: 80px;
`;

export const NavLinks = styled.a`
  color: #fff;
  text-decoration: none;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  height: 100%;

  &:hover {
    color: #FF7F50;
  }
`;

export const NavItemBtn = styled.div`
  display: flex;
  gap: 10px;
`;
