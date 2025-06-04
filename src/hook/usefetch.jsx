import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        const alldata = response.data.data;
        setUsers(alldata);
      } catch (error) {
        setError(error);
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [url]);

  return [users, loading, error];
};

export default useFetch;