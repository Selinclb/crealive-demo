import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getPortfolioItems } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getPortfolioItems();
        if (response?.data) {
          setProjects(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!projects.length) return <div>No projects available</div>;

  // Benzersiz kategorileri çıkar
  const categories = ['All', ...new Set(projects.map(p => p.Category))];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.Category === selectedCategory);

  const handleProjectClick = (project) => {
    navigate(`/portfolio/${project.documentId}`);
  };

  return (
    <PortfolioContainer>
      <PortfolioTitle>Portfolyo</PortfolioTitle>
      <Categories>
        {categories.map(category => (
          <CategoryButton
            key={category}
            $active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </Categories>

      <ProjectsGrid>
        {filteredProjects.map(project => (
          <ProjectItem 
            key={project.id}
            onClick={() => handleProjectClick(project)}
          >
            <ImageContainer>
              <MediaContent project={project} />
              <Overlay>
                <ProjectTitle>{project.Title}</ProjectTitle>
              </Overlay>
            </ImageContainer>
          </ProjectItem>
        ))}
      </ProjectsGrid>
    </PortfolioContainer>
  );
};

const MediaContent = ({ project }) => {
  if (!project.Media?.length) return null;

  // İlk medyayı kullan
  const mediaUrl = project.Media[0].url;
  
  if (project.Type?.toLowerCase() === 'video') {
    return (
      <ProjectVideo
        src={`http://localhost:1337${mediaUrl}`}
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }
  
  return (
    <ProjectImage 
      src={`http://localhost:1337${mediaUrl}`} 
      alt={project.Title} 
    />
  );
};

const PortfolioContainer = styled.div`
  padding: 2rem;
  margin: 0 auto;
  max-width: 1400px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const Categories = styled.div`
  display: flex;
  justify-content: center;
  margin: 4rem 0;
  gap: 2rem;
`;

const CategoryButton = styled.button`
  background: none;
  border: none;
  font-family: 'DIN Next Light', sans-serif;
  font-size: 1.2rem;
  color: ${props => props.$active ? '#000' : '#666'};
  cursor: pointer;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${props => props.$active ? '#000' : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    color: #000;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  padding: 0 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectItem = styled.div`
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &:hover ${Overlay} {
    opacity: 1;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${ImageContainer}:hover & {
    transform: scale(1.05);
  }
`;

const ProjectVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${ImageContainer}:hover & {
    transform: scale(1.05);
  }
`;

const ProjectTitle = styled.h3`
  font-family: 'DIN Neuzeit Grotesk', sans-serif;
  color: white;
  font-size: 1.5rem;
  margin: 0;
  text-align: center;
  font-weight: 300;
  text-transform: uppercase;
  padding: 0 2rem;
`;

const PortfolioTitle = styled.h1`
  font-family: 'DIN Neuzeit Grotesk', sans-serif;
  font-size: 2.5rem;
  font-weight: 300;
  text-align: center;
  color: #000;
  margin: 2rem 0;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export default Portfolio;