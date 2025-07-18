import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(url);
        
        // Handle different response structures
        const responseData = response.data?.data || response.data || [];
        setData(Array.isArray(responseData) ? responseData : []);
      } catch (error) {
        setError(error);
        console.log("Error fetching data:", error);
        setData([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return [data, loading, error];
};

export default useFetch;