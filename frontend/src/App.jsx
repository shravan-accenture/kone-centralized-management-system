import React from 'react';
import UploadPage from './pages/UploadPage';

// Main application shell with the shared header and upload workspace.
function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-inner">
          <div>
            <img src="/kone-logo.png" alt="KONE" className="brand-logo" />
            <h1 className="app-title">Centralized Management System</h1>
          </div>

          <div className="header-badge">Upload workspace</div>
        </div>
      </header>

      <main className="app-main">
        <UploadPage />
      </main>
    </div>
  );
}

export default App;
