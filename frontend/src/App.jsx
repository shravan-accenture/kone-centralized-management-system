import React, { useEffect } from "react";
import UploadPage from "./pages/UploadPage";

function App() {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand">
            KONE Centralized Management System
          </span>
        </div>
      </nav>

      <UploadPage />
    </>
  );
}

export default App;