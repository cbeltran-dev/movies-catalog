import axios from 'axios';

// const BASE_URL = 'http://localhost:8080/api/v1';
const URI = import.meta.env.VITE_API_URI;

const getToken = () => {
  const authData = localStorage.getItem('auth_token');
  if (!authData) {
    throw new Error('No hay token de autenticación');
  }
  return JSON.parse(authData).token;
};

export const movieService = {
  create: async (movieData) => {
  const token = getToken();
  try {
    const response = await axios.post(`${URI}/movie/create`, movieData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al crear la película');
  }
},

  update: async (id, movieData) => {
    const token = getToken();
    try {
      const response = await axios.put(`${URI}/movie/update/${id}`, movieData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar la película');
    }
  },

  delete: async (name) => {
    const token = getToken();
    try {
      const response = await axios.patch(`${URI}/movie/deletebyname/${name}`, {}, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'No se pudo eliminar');
    }
  }
};
