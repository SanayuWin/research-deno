import React, { useState, useEffect } from "react";


const Home = () => {
  const [data, setData] = useState([]);
  const BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(BACKEND_SERVER+"query");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  return (
    <div>
      {JSON.stringify(data)}
      
    </div>
  );
};


export default Home;