import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getContactInfo } from '../services/api';

const Contact = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await getContactInfo();
        
        if (response?.data && Array.isArray(response.data) && response.data.length > 0) {
          setContactInfo(response.data[0]);
          setError(null);
        } else {
          setError('Veri bulunamadı');
        }
      } catch (error) {
        setError('Veriler yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingText>Yükleniyor...</LoadingText>
      </LoadingContainer>
    );
  }

  if (error || !contactInfo) {
    return (
      <ErrorContainer>
        <ErrorText>{error || 'İletişim bilgileri bulunamadı.'}</ErrorText>
      </ErrorContainer>
    );
  }

  return (
    <ContactContainer>
      <ContentWrapper>
        <ContactContent>
          <Title>İLETİSİM</Title>
          <Description>{contactInfo.Description}</Description>
          
          <ContactSection>
            <SectionTitle>E-POSTA</SectionTitle>
            <ContactText>{contactInfo.Email}</ContactText>
          </ContactSection>

          <ContactSection>
            <SectionTitle>ADRES</SectionTitle>
            <ContactText>{contactInfo.Address}</ContactText>
          </ContactSection>
        </ContactContent>
      </ContentWrapper>
    </ContactContainer>
  );
};

const ContactContainer = styled.div`
  min-height: 100vh;
  padding: 0 1rem;
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 6rem 0;
`;

const ContactContent = styled.div`
  max-width: 600px;
`;

const Title = styled.h1`
  font-family: 'DIN Neuzeit Grotesk', sans-serif;
  font-size: 3rem;
  color: #000000;
  font-weight: bold;
  margin-bottom: 1rem;
  letter-spacing: 2px;
`;

const Description = styled.p`
  font-family: 'DIN Next Light', sans-serif;
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 4rem;
  font-weight: 300;
`;

const ContactSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-family: 'DIN Next LT Pro', sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ContactText = styled.p`
  font-family: 'DIN Next Light', sans-serif;
  font-size: 1.2rem;
  line-height: 1.6;
  font-weight: 300;
`;

const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.p`
  font-family: 'DIN Next Light', sans-serif;
  font-size: 1.2rem;
`;

const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled.p`
  font-family: 'DIN Next Light', sans-serif;
  font-size: 1.2rem;
  color: #666;
`;

export default Contact;
