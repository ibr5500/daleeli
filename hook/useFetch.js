import { useState, useEffect } from 'react';
import axios from 'axios';
import { RAPID_API_KEY } from '@env';

const rapidApiKey = RAPID_API_KEY;

const useFetch = ({ endPoint }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endPoint}`,
    headers: {
      'X-RapidAPI-Key': rapidApiKey,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
    params: { ...query },
  };

  const fetData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.request(options);

      setData(res.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert('There is an error!!');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
