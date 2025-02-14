import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { getMainData } from '../services/api';

const Home = () => {
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

  const handleScroll = () => {
    const navbarHeight = 80;
    const yOffset = window.pageYOffset + window.innerHeight - navbarHeight;
    
    window.scrollTo({
      top: yOffset,
      behavior: 'smooth'
    });
  };
  
  return (
    <HomeContainer>
      <MainContent>
        <Title>{mainData?.Hero_Title}</Title>
        <SubtitleContainer>
          <Subtitle>{mainData?.Hero_Subtitle}</Subtitle>
        </SubtitleContainer>
        <ScrollArrow onClick={handleScroll}>
          <ArrowContainer>
            <Arrow viewBox="0 0 24 24">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </Arrow>
          </ArrowContainer>
        </ScrollArrow>
      </MainContent>
    </HomeContainer>
  );
};

export default Home;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(10px);
  }
  60% {
    transform: translateY(5px);
  }
`;

const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('/hero.gif');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 0 2rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.7);
  }
`;

const MainContent = styled.div`
  text-align: center;
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  font-family: 'DIN Neuzeit Grotesk', sans-serif;
  font-size: 5rem;
  color: #000000;
  font-weight: bold;
  margin-bottom: 1rem;
  letter-spacing: 2px;
`;

const SubtitleContainer = styled.div`
  display: inline-block;
  background-color: #000000;
  padding: 0.5rem 1rem;
`;

const Subtitle = styled.h2`
  font-family: 'DIN Next Light', sans-serif;
  font-size: 1.2rem;
  color: #ffffff;
  font-weight: 300;
  letter-spacing: 3px;
`;

const ArrowContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;

const Arrow = styled.svg`
  width: 40px;
  height: 40px;
  fill: #000000;
  animation: ${bounce} 2s infinite;
  cursor: pointer;
`;

const ScrollArrow = styled.div`
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(10px);
  }
`;