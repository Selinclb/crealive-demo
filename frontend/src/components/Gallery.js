import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { getGalleryItems } from '../services/api';

// Styled components
const GallerySection = styled.section`
  padding: 4rem 0;
  background-color: #ffffff;
  overflow: hidden;
`;

const GalleryTrack = styled.div`
  display: flex;
  gap: 100px;
  overflow-x: scroll;
  white-space: nowrap;
  padding: 0 2rem;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ProjectItem = styled.div`
  flex: 0 0 auto;
  width: 400px;
  height: 600px;
  cursor: pointer;
  overflow: hidden;
  margin: 0 1rem;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: #ffffff;
`;

const ProjectVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: #ffffff;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ProjectItem}:hover & {
    opacity: 1;
  }
`;

const ProjectTitle = styled.h3`
  font-family: 'DIN Next Light', sans-serif;
  color: white;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  text-align: center;
  font-weight: 300;
  letter-spacing: 1px;
  white-space: normal;
`;

const ProjectCategory = styled.p`
  font-family: 'DIN Next Light', sans-serif;
  color: #cccccc;
  font-size: 0.9rem;
  letter-spacing: 1px;
  white-space: normal;
`;

// Gallery bileşeni
const Gallery = () => {
  const [items, setItems] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await getGalleryItems();
        if (response && response.length > 0) {
          const formattedItems = response.map(item => ({
            id: item.id,
            title: item.Title || 'Untitled',
            category: item.Category || 'Uncategorized',
            type: item.Type || 'image',
            source: item.Media?.[0]?.url 
              ? `http://localhost:1337${item.Media[0].url}`
              : null
          }));
          setItems(formattedItems.filter(item => item.source !== null));
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };
    fetchGallery();
  }, []);

  // Sonsuz döngü için projeleri üç kez çoğaltıyoruz
  const triplicatedItems = [...items, ...items, ...items];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let animationFrameId;
    let scrollPos = 0;
    
    const scroll = () => {
      if (scrollContainer && !isHovered) {
        // Sola doğru kaydırma
        scrollPos += 1; // Hızı artırdık
        scrollContainer.scrollLeft = scrollPos;

        // Ortadaki set'e geldiğimizde başa dön
        if (scrollPos >= (scrollContainer.scrollWidth / 3)) {
          scrollPos = 0;
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    if (items.length > 0) {
      scroll();
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isHovered, items]);

  const MediaContent = ({ project }) => {
    if (!project.source) return null;

    if (project.type === 'video') {
      return (
        <ProjectVideo
          src={project.source}
          autoPlay
          muted
          loop
          playsInline
        />
      );
    }
    return <ProjectImage src={project.source} alt={project.title} />;
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <GallerySection>
      <GalleryTrack 
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {triplicatedItems.map((project, index) => (
          <ProjectItem 
            key={`${project.id}-${index}`}
            className="project-item"
          >
            <ImageContainer>
              <MediaContent project={project} />
              <Overlay>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectCategory>{project.category}</ProjectCategory>
              </Overlay>
            </ImageContainer>
          </ProjectItem>
        ))}
      </GalleryTrack>
    </GallerySection>
  );
};

export default Gallery;
