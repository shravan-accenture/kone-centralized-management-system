
import React, { useEffect } from "react";


function App() {
  useEffect(() => {
    fetch("http://localhost:5000/health")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch(console.error);
  }, []);

  return <h1>KONE Centralized Management System</h1>;
}

export default App;