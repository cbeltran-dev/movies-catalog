import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';

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
    const response = await axios.post(`${BASE_URL}/movie/create`, movieData, {
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
      const response = await axios.put(`${BASE_URL}/movie/update/${id}`, movieData, {
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
      const response = await axios.patch(`${BASE_URL}/movie/deletebyname/${name}`, {}, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'No se pudo eliminar');
    }
  }
};
