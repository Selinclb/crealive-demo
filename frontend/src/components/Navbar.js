import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getMainData } from '../services/api';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mainData, setMainData] = useState(null);

  useEffect(() => {
    const fetchMainData = async () => {
      try {
        const response = await getMainData();
        if (response?.data?.[0]) {
          setMainData(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching main data:', error);
      }
    };

    fetchMainData();
  }, []);

  return (
    <Nav>
      <NavContainer>
        <LogoLink to="/">
          <LogoImage 
            src={`http://localhost:1337${mainData?.Logo?.url}`} 
            alt="Logo" 
          />
        </LogoLink>

        <MenuButton type="button" onClick={() => setIsOpen(!isOpen)}>
          <MenuIconWrapper $isOpen={isOpen}>
            <span></span>
            <span></span>
            <span></span>
          </MenuIconWrapper>
        </MenuButton>

        <StyledNavLinks $isOpen={isOpen}>
          <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/portfolio" onClick={() => setIsOpen(false)}>Portfolyo</NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)}>Hakkımda</NavLink>
          <NavLink to="/contact" onClick={() => setIsOpen(false)}>İletişim</NavLink>
        </StyledNavLinks>
      </NavContainer>
    </Nav>
  );
};

const Nav = styled.nav`
  background-color: white;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid #eee;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  position: relative;

  @media (max-width: 768px) {
    justify-content: space-between;
    gap: 0;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MenuIconWrapper = styled.div`
  width: 24px;
  height: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span {
    display: block;
    height: 2px;
    width: 100%;
    background-color: #000;
    transition: all 0.3s ease;
    
    &:first-child {
      transform: ${({ $isOpen }) => $isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'};
    }
    
    &:nth-child(2) {
      opacity: ${({ $isOpen }) => $isOpen ? '0' : '1'};
    }
    
    &:last-child {
      transform: ${({ $isOpen }) => $isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'};
    }
  }
`;

const StyledNavLinks = styled.div`
  display: flex;
  gap: 4rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${({ $isOpen }) => $isOpen ? '0' : '-100%'};
    height: 100vh;
    width: 100%;
    background-color: white;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    transition: right 0.3s ease;
    z-index: 1000;
  }
`;

const NavLink = styled(Link)`
  color: #000000;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 1px;
  position: relative;
  padding: 5px 0;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0;
    left: 0;
    background-color: #000000;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 50px;
  width: auto;
  object-fit: contain;
`;

export default Navbar; 