import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAboutData } from '../services/api';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await getAboutData();
        if (response?.data?.[0]) {
          setAboutData(response.data[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching about data:', error);
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!aboutData) {
    return <div>No data available</div>;
  }

  return (
    <AboutContainer>
      <DesktopLayout>
        <LeftSection>
          <BioTitle>{aboutData.bio_title}</BioTitle>
          <BioLinks>
            {aboutData.bio_links.map((link, index) => (
              <BioLink key={index}>{link}</BioLink>
            ))}
          </BioLinks>
          <BioText>
            {aboutData.bio_text}
          </BioText>
        </LeftSection>

        <CenterSection>
          <FlowerImage 
            src={aboutData.Image?.url 
              ? `http://localhost:1337${aboutData.Image.url}`
              : "/logo.png"} 
            alt="Flower illustration" 
          />
        </CenterSection>

        <RightSection>
          <InterestsTitle>{aboutData.interests_title}</InterestsTitle>
          <InterestsList>
            {aboutData.interests.map((interest, index) => (
              <InterestItem key={index}>{interest}</InterestItem>
            ))}
          </InterestsList>
          <InspirationText>
            {aboutData.inspiration_text}
          </InspirationText>
        </RightSection>
      </DesktopLayout>

      <MobileLayout>
        <BioTitle>{aboutData.bio_title}</BioTitle>
        <BioLinks>
          {aboutData.bio_links.map((link, index) => (
            <BioLink key={index}>{link}</BioLink>
          ))}
        </BioLinks>
        <InterestsTitle>{aboutData.interests_title}</InterestsTitle>
        <InterestsList>
          {aboutData.interests.map((interest, index) => (
            <InterestItem key={index}>{interest}</InterestItem>
          ))}
        </InterestsList>
        <FlowerImage 
          src={aboutData.Image?.url 
            ? `http://localhost:1337${aboutData.Image.url}`
            : "/logo.png"} 
          alt="Flower illustration" 
        />
        <BioText>
          {aboutData.bio_text}
        </BioText>
        <InspirationText>
          {aboutData.inspiration_text}
        </InspirationText>
      </MobileLayout>
    </AboutContainer>
  );
};

const AboutContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 0;
  max-width: 1400px;
  margin: 0 auto;
  width: 90%;
`;

const DesktopLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileLayout = styled.div`
  display: none;
  flex-direction: column;
  gap: 2rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 0;
`;

const BioTitle = styled.h1`
  font-family: 'DIN Next Light', sans-serif;
  font-size: 4rem;
  font-weight: 500;
  letter-spacing: 1px;
`;

const BioLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BioLink = styled.span`
  font-family: 'DIN Next Light', sans-serif;
  font-size: 1.8rem;
  font-weight: 300;
  white-space: pre-line;
  cursor: pointer;
`;

const BioText = styled.p`
  font-family: 'DIN Next Light', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  font-weight: 300;
  color: #666;
  margin-top: 11rem;
  text-align: justify;
  hyphens: auto;
`;

const CenterSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FlowerImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 0;
`;

const InterestsTitle = styled.h2`
  font-family: 'DIN Next Light', sans-serif;
  font-size: 1.5rem;
  font-weight: 300;
  width: fit-content;
  border-bottom: 1px solid #000;
  padding-bottom: 0.5rem;
`;

const InterestsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InterestItem = styled.span`
  font-family: 'DIN Next Light', sans-serif;
  font-size: 1.2rem;
  font-weight: 300;
  color: #666;
  line-height: 1.2;
`;

const InspirationText = styled.p`
  font-family: 'DIN Next Light', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  font-weight: 300;
  color: #666;
  margin-top: 14.8rem;
  text-align: justify;
  hyphens: auto;
`;

export default About;