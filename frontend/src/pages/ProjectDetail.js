import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getPortfolioItems, getProjectNavigation } from '../services/api';

const ProjectDetail = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previousProject, setPreviousProject] = useState(null);
  const [nextProject, setNextProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getPortfolioItems();
        console.log('API Response:', response); // Veriyi kontrol edelim
        
        if (response?.data) {
          const projects = response.data;
          const currentIndex = projects.findIndex(p => p.documentId === projectId);
          
          console.log('Current Index:', currentIndex);
          console.log('Current Project:', projects[currentIndex]);
          
          if (currentIndex === -1) {
            navigate('/portfolio');
            return;
          }

          setProject(projects[currentIndex]);
          
          // Önceki ve sonraki projeleri ayarla
          if (currentIndex > 0) {
            setPreviousProject(projects[currentIndex - 1]);
          }
          
          if (currentIndex < projects.length - 1) {
            setNextProject(projects[currentIndex + 1]);
          }
          
          console.log('Previous:', previousProject);
          console.log('Next:', nextProject);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId, navigate]);

  if (loading) return <div>Loading...</div>;
  if (!project) return <div>Proje bulunamadı</div>;

  return (
    <DetailContainer>
      <Header>
        <TitleSection>
          <ProjectTitle>{project.Title}</ProjectTitle>
          
          <InfoGroup>
            <InfoLabel>Proje türü</InfoLabel>
            <InfoText>{project.Category}</InfoText>
          </InfoGroup>
          
          <InfoGroup>
            <InfoLabel>Tarih</InfoLabel>
            <InfoText>{new Date(project.createdAt).getFullYear()}</InfoText>
          </InfoGroup>

          <InfoGroup>
            <InfoLabel>Açıklama</InfoLabel>
            <Description>{project.Description}</Description>
          </InfoGroup>
        </TitleSection>
      </Header>

      <ImageGrid>
        {project.Media?.map((media, index) => (
          <ImageContainer key={index}>
            <ProjectImage 
              src={`http://localhost:1337${media.url}`} 
              alt={project.Title} 
            />
            <ImageOverlay>
              <ImageTitle>{project.Title}</ImageTitle>
            </ImageOverlay>
          </ImageContainer>
        ))}
      </ImageGrid>

      <Navigation>
        {previousProject && (
          <NavLink to={`/portfolio/${previousProject.documentId}`}>
            <NavLabel>Önceki Proje</NavLabel>
            <NavTitle>{previousProject.Title}</NavTitle>
          </NavLink>
        )}
        <NavCenter to="/portfolio">
          <NavCenterText>Tüm Projeler</NavCenterText>
        </NavCenter>
        {nextProject && (
          <NavLink to={`/portfolio/${nextProject.documentId}`} $isNext>
            <NavLabel>Sonraki Proje</NavLabel>
            <NavTitle>{nextProject.Title}</NavTitle>
          </NavLink>
        )}
      </Navigation>
    </DetailContainer>
  );
};

export default ProjectDetail;

const DetailContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 6rem 1rem;
  width: 100%;
  max-width: 100%;
`;

const TitleSection = styled.div`
  max-width: 50%;
`;

const ProjectTitle = styled.h1`
  font-family: 'DIN Next Light', sans-serif;
  font-size: 4rem;
  line-height: 1.2;
  margin-bottom: 3rem;
  font-weight: 300;
  white-space: pre-line;
`;

const InfoGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const InfoLabel = styled.h2`
  font-family: 'DIN Next Light', sans-serif;
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 0.5rem;
  font-weight: 300;
`;

const InfoText = styled.p`
  font-family: 'DIN Next Light', sans-serif;
  font-size: 1.2rem;
  color: #000;
  font-weight: 300;
`;

const Description = styled.p`
  font-family: 'DIN Next Light', sans-serif;
  font-size: 1.2rem;
  color: #000;
  margin-top: 0.5rem;
  font-weight: 300;
  line-height: 1.6;
  max-width: 600px;
`;

const CoverImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 2rem;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 4rem 0;
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/3;
  cursor: pointer;

  &:hover {
    img {
      transform: scale(1.05);
    }
    div {
      opacity: 1;
    }
  }

  &:first-child {
    grid-column: 1 / -1;
    aspect-ratio: 16/9;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const ImageTitle = styled.h3`
  font-family: 'DIN Next Light', sans-serif;
  color: white;
  font-size: 1.2rem;
  font-weight: 300;
  letter-spacing: 1px;
  margin: 0;
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 1rem;
  margin-top: 4rem;
  width: calc(100% + 2rem);
  margin-left: -1rem;
  margin-right: -1rem;
  background: #f8f8f8;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: all 0.3s ease;
  padding: 2rem;
  flex: 1;

  ${props => props.$isNext && `
    text-align: right;
    align-items: flex-end;
  `}

  &:hover {
    background: #f0f0f0;
  }
`;

const NavCenter = styled(Link)`
  text-decoration: none;
  color: inherit;
  padding: 2rem;
`;

const NavCenterText = styled.span`
  font-family: 'DIN Next Light', sans-serif;
  font-size: 1rem;
  color: #666;
  font-weight: 300;
`;

const NavLabel = styled.span`
  font-family: 'DIN Next Light', sans-serif;
  font-size: 0.9rem;
  color: #666;
  font-weight: 300;
  letter-spacing: 1px;
`;

const NavTitle = styled.span`
  font-family: 'DIN Neuzeit Grotesk', sans-serif;
  font-size: 1.2rem;
  color: #000;
  font-weight: 300;
  text-transform: uppercase;
`;
