'use client';

import { useContext, useState } from 'react';
import { GlobalStateContext } from '../../contexts/users';

export default function Sidebar() {
  const { state, setState } = useContext(GlobalStateContext);
  const [cameraUrl, setCameraUrl] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setResults([]);

    try {
      const response = await fetch('http://127.0.0.1:5000/detect_food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ camera_url: cameraUrl }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResults(data.results);
      }
    } catch (err) {
      setError('An error occurred while fetching the data.');
    }
  };

  return (
    <div>
      <img
        className="w-64 h-64 rounded-full object-cover item-center"
        src={state[0].picture}
        alt="user_picture"
      />
      <div className="text-center">
        {state[0].name}
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="camera-url">Camera URL:</label>
        <input
          type="text"
          id="camera-url"
          value={cameraUrl}
          onChange={(e) => setCameraUrl(e.target.value)}
          required
        />
        <button type="submit">Detect Food</button>
      </form>

      {error && <p>Error: {error}</p>}

      <div id="results">
        {results.map((result, index) => (
          <p key={index}>
            Class: {result.class_name}, Confidence: {result.confidence}, Coordinates: {result.coordinates.join(', ')}
          </p>
        ))}
      </div>
    </div>
  );
}