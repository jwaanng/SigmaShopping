import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";

export default function Home() {
  const socket = useSocket("http://127.0.0.1:5000"); // Flask server URL
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const startDetection = () => {
    const cameraUrl = "http://192.168.1.100:4747/video"; // Replace with your camera URL
    if (socket) {
      socket.emit("start_detection", { camera_url: cameraUrl });
    }
  };

  useEffect(() => {
    if (!socket) return;

    // Listen for results
    socket.on("results", (data) => {
      console.log("Detection Results:", data);
      setResults(data.results);
    });

    // Listen for errors
    socket.on("error", (data) => {
      console.error("Error:", data);
      setError(data.error);
    });

    // Cleanup on unmount
    return () => {
      socket.off("results");
      socket.off("error");
    };
  }, [socket]);

  return (
    <div>
      <h1>Real-Time Food Detection</h1>
      <button onClick={startDetection}>Start Detection</button>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
}