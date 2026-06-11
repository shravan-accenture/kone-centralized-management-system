import React, { useState } from "react";
import axios from "axios";

function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [products, setProducts] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
  if (!selectedFile) return;

  const formData = new FormData();

  formData.append("file", selectedFile);

  try {
    const response = await axios.post(
      "http://localhost:5000/api/files/upload",
      formData
    );

    console.log(response);
console.log(response.data);
setProducts(response.data.products);

    alert("File uploaded successfully");
  } catch (error) {
    console.error(error);
    alert("Upload failed");
  }
};

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header">
          <h3>Upload File</h3>
        </div>

        <div className="card-body">
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
          />

          {selectedFile && (
            <div className="mt-3">
              <strong>Selected File:</strong>
              <p>{selectedFile.name}</p>
            </div>
          )}

        <button
  className="btn btn-primary mt-3"
  disabled={!selectedFile}
  onClick={handleUpload}
>
  Upload
</button>
{products.length > 0 && (
  <div className="mt-6 overflow-x-auto">
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-2">Product ID</th>
          <th className="border px-4 py-2">Product Name</th>
          <th className="border px-4 py-2">Price</th>
          <th className="border px-4 py-2">Region</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td className="border px-4 py-2">
              {product["Product ID"]}
            </td>

            <td className="border px-4 py-2">
              {product["Product Name"]}
            </td>

            <td className="border px-4 py-2">
              {product["Price"]}
            </td>

            <td className="border px-4 py-2">
              {product["Region"]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
        </div>
      </div>
    </div>
  );
}

export default UploadPage;