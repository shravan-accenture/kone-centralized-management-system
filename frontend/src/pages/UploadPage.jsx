import React, { useState } from 'react';
import axios from 'axios';

function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  // Keep the selected spreadsheet in component state until the user uploads it.
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0] || null);
    setMessage('');
    setStatus('idle');
  };

  // Send the selected file to the backend and display the imported product rows.
  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();

    formData.append('file', selectedFile);
    setStatus('uploading');
    setMessage('Uploading and importing spreadsheet data...');

    try {
      const response = await axios.post('http://localhost:5000/api/files/upload', formData);

      setProducts(response.data.products || []);
      setStatus('success');
      setMessage('File uploaded successfully. Product rows are ready for review.');
    } catch (error) {
      console.error(error);
      setStatus('error');
      setMessage('Upload failed. Please check the backend server and spreadsheet format.');
    }
  };

  const getStatusClassName = () => {
    if (status === 'error') return 'status-message status-message-error';
    if (status === 'success') return 'status-message status-message-success';

    return 'status-message status-message-info';
  };

  return (
    <section className="upload-layout">
      <div className="upload-card">
        <div>
          <p className="section-label">Spreadsheet import</p>
          <h2 className="section-title">Upload product data</h2>
          <p className="section-copy">
            Select an Excel file with product ID, product name, price, and region columns.
          </p>
        </div>

        <label htmlFor="product-file" className="file-dropzone">
          <span className="file-dropzone-icon">+</span>
          <span className="file-dropzone-title">Choose spreadsheet</span>
          <span className="file-dropzone-help">XLSX, XLS, or CSV product files</span>
          <input
            id="product-file"
            type="file"
            accept=".xlsx,.xls,.csv"
            className="sr-only"
            onChange={handleFileChange}
          />
        </label>

        {selectedFile && (
          <div className="selected-file">
            <p className="selected-file-label">Selected file</p>
            <p className="selected-file-name">{selectedFile.name}</p>
            <p className="selected-file-size">{(selectedFile.size / 1024).toFixed(1)} KB</p>
          </div>
        )}

        {message && <div className={getStatusClassName()}>{message}</div>}

        <button
          className="upload-button"
          disabled={!selectedFile || status === 'uploading'}
          onClick={handleUpload}
        >
          {status === 'uploading' ? 'Uploading...' : 'Upload file'}
        </button>
      </div>

      <div className="panel">
        <div className="table-panel-header">
          <div>
            <p className="table-label">Imported products</p>
            <h2 className="table-title">Preview table</h2>
          </div>

          <div className="row-count">{products.length} rows</div>
        </div>

        {products.length > 0 ? (
          <div className="table-scroll">
            <table className="products-table">
              <thead className="products-table-head">
                <tr>
                  <th className="products-table-heading">Product ID</th>
                  <th className="products-table-heading">Product Name</th>
                  <th className="products-table-heading">Price</th>
                  <th className="products-table-heading">Region</th>
                </tr>
              </thead>

              <tbody className="products-table-body">
                {products.map((product, index) => (
                  <tr key={`${product['Product ID'] || 'product'}-${index}`} className="products-table-row">
                    <td className="products-table-id">{product['Product ID']}</td>
                    <td className="products-table-cell">{product['Product Name']}</td>
                    <td className="products-table-value">{product['Price']}</td>
                    <td className="products-table-value">
                      <span className="region-pill">{product['Region']}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <div>
              <div className="empty-state-icon">#</div>
              <h3 className="empty-state-title">No rows imported yet</h3>
              <p className="empty-state-copy">
                Upload a product spreadsheet to preview imported rows here.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default UploadPage;
