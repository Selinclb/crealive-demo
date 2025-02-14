import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'https://crealive-demo.onrender.com';
const API_URL = `${BASE_URL}/api`;
const API_TOKEN = process.env.REACT_APP_STRAPI_API_TOKEN;

// Medya URL'lerini düzeltmek için yardımcı fonksiyon
const fixMediaUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${BASE_URL}${url}`;
};

// Medya URL'lerini içeren nesneleri düzeltmek için yardımcı fonksiyon
const fixMediaUrls = (data) => {
  if (!data) return null;
  
  if (Array.isArray(data)) {
    return data.map(item => fixMediaUrls(item));
  }

  if (typeof data === 'object') {
    const fixed = {};
    for (const [key, value] of Object.entries(data)) {
      if (key === 'url' && typeof value === 'string') {
        fixed[key] = fixMediaUrl(value);
      } else if (typeof value === 'object') {
        fixed[key] = fixMediaUrls(value);
      } else {
        fixed[key] = value;
      }
    }
    return fixed;
  }

  return data;
};

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export const getProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects?populate=*`);
    return response.data.data;
  } catch (error) {
    return [];
  }
};

export const getAbout = async () => {
  try {
    const response = await axios.get(`${API_URL}/abouts?populate=*`);
    return response.data.data;
  } catch (error) {
    return null;
  }
};

export const getContact = async () => {
  try {
    const response = await axios.get(`${API_URL}/contacts?populate=*`);
    return response.data.data;
  } catch (error) {
    return null;
  }
};

export const getGalleryItems = async () => {
  try {
    const response = await axiosInstance.get('/galleries?populate=*');
    
    if (!response.data.data) {
      return [];
    }

    return response.data.data.map(item => ({
      id: item.id,
      ...item.attributes,
      Media: item.attributes.Media?.data?.map(media => ({
        url: media.attributes.url
      })) || []
    }));

  } catch (error) {
    return [];
  }
};

export const getPortfolioItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/portfolios?populate=*`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProjectNavigation = async (projectId) => {
  try {
    const response = await axios.get(`${API_URL}/portfolios?populate=*`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    });

    const projects = response.data.data;
    const currentIndex = projects.findIndex(p => p.documentId === projectId);
    
    return {
      previous: currentIndex > 0 ? projects[currentIndex - 1] : null,
      next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
    };
  } catch (error) {
    throw error;
  }
};

export const getContactInfo = async () => {
  try {
    const response = await axios.get(`${API_URL}/contacts`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFooterData = async () => {
  try {
    const response = await axiosInstance.get('/footers');
    console.log('Footer data success:', response.data);
    return response.data.data[0];
  } catch (error) {
    console.error('Footer data error:', {
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;
  }
};

export const getAboutData = async () => {
  try {
    const response = await axios.get(`${API_URL}/abouts?populate=*`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMainData = async () => {
  try {
    const response = await axiosInstance.get('/mains?populate=*');
    
    if (!response.data.data || response.data.data.length === 0) {
      return null;
    }

    const mainData = response.data.data[0];

    return {
      id: mainData.id,
      attributes: {
        Hero_Title: mainData.Hero_Title,
        Hero_Subtitle: mainData.Hero_Subtitle,
        Logo: mainData.Logo ? {
          data: {
            attributes: {
              url: mainData.Logo.url
            }
          }
        } : null
      }
    };

  } catch (error) {
    return null;
  }
};

