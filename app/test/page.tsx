"use client"

import React, { useEffect, useState } from 'react';

const TestPage = () => {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/health-check');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setResponseData(data); // Set the response data to state
      } catch (err) {
        setError(err.message); // Set error if any
      } finally {
        setLoading(false); // Set loading to false after the API call is complete
      }
    };

    fetchData();
  }, []); // Empty dependency array to only run this on mount

  return (
    <div>
      <h1>API Response</h1>

      {loading && <p>Loading...</p>}  {/* Show loading message while fetching */}
      
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}  {/* Show error message if an error occurs */}
      
      {responseData && (
        <pre>{JSON.stringify(responseData, null, 2)}</pre> // Display the response data
      )}
    </div>
  );
};

export default TestPage;
