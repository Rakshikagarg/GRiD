/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { IconContext } from 'react-icons/lib';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Button } from '../../globalStyles';

import {
  Nav, NavbarContainer, LogoLeft, RightSection,
  HamburgerIcon, NavMenu, NavItem, NavLinks,
  NavItemBtn, LogoRight
} from './Navbar.elements';

import leftLogo from '../../images/gridlogo.png';
import rightLogo1 from '../../images/AIC LOGO.png';
import rightLogo2 from '../../images/ALL_ABOUT_STARTUPS_.png';
import Login from '../../pages/Login/login';
import SignUp from '../../pages/SignUp/SignUp';

const Navbar: React.FC = () => {
  const [click, setClick] = useState<boolean>(false);
  const [button, setButton] = useState<boolean>(true);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showSignupModal, setShowSignupModal] = useState<boolean>(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const showButton = () => setButton(window.innerWidth > 960);

  useEffect(() => {
    showButton();
    window.addEventListener('resize', showButton);
    return () => window.removeEventListener('resize', showButton);
  }, []);

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <Nav>
        <NavbarContainer>
          <LogoLeft src={leftLogo} alt="Left Logo" />

          <RightSection>
            <HamburgerIcon onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </HamburgerIcon>

            <NavMenu click={click}>
              <NavItem>
                <NavLinks href="/">Home</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks href="/services">Services</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks href="/products">Products</NavLinks>
              </NavItem>
              <NavItemBtn>
                {button && (
                  <>
                    <Button primary onClick={() => setShowLoginModal(true)}>LOGIN</Button>
                    <Button primary onClick={() => setShowSignupModal(true)}>SIGN UP</Button>
                  </>
                )}
              </NavItemBtn>
            </NavMenu>
    <LogoRight src={rightLogo1} alt="Right Logo 1" />
    <LogoRight src={rightLogo2} alt="Right Logo 2" />
  </RightSection>
        </NavbarContainer>
      </Nav>

      {/* ⬇ Show Modals */}
      {showLoginModal && <Login show={showLoginModal} onClose={() => setShowLoginModal(false)} />}
      {showSignupModal && <SignUp show={showSignupModal} onClose={() => setShowSignupModal(false)} />}
    </IconContext.Provider>
  );
};

export default Navbar;
