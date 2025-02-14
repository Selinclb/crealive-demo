import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getFooterData } from '../services/api';

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await getFooterData();
        if (response?.data && response.data.length > 0) {
          setFooterData(response.data[0]);
        }
      } catch (error) {
        console.error('Footer data fetch error:', error);
      }
    };

    fetchFooterData();
  }, []);

  if (!footerData) return null;

  return (
    <FooterContainer>
      <FooterContent>
        <SocialLinks>
          {footerData.social_links?.map((link, index) => (
            <SocialLink 
              key={index} 
              href={link.URL} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {link.Platform}
            </SocialLink>
          ))}
        </SocialLinks>
        <Copyright>{footerData.Copyright}</Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  width: 100%;
  padding: 4rem 0;
  background: #fff;
  border-top: 1px solid #eee;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 60px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
    padding: 1rem 2rem;
  }
`;

const Copyright = styled.p`
  font-family: 'DIN Next Light', sans-serif;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const SocialLink = styled.a`
  font-family: 'DIN Next Light', sans-serif;
  font-size: 0.9rem;
  color: #666;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #000;
  }
`;

export default Footer;
