import React from 'react';
import UploadPage from './pages/UploadPage';

// Main application shell with the shared header and upload workspace.
function App() {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand">KONE Centralized Management System</span>
        </div>
      </nav>

      <UploadPage />
    </>
  );
}

export default App;
