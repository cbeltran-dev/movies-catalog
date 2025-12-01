import { useState, useEffect } from "react";
import axios from "axios";

const useGetAxios = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const requestData = async () => {
      try {
        const authData = localStorage.getItem('auth_token');
        
        if (!authData) {
          throw new Error('No hay token de autenticación');
        }
        const parsedData = JSON.parse(authData);
        const token = parsedData.token;
        
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setData(response.data);
        setError(null);
      } catch (error) {
        console.log('Error procesando JWT:', error.message);
        setError(error);
      }
    }
    requestData();
  }, [url]);

  return { data, error }
};

export default useGetAxios;