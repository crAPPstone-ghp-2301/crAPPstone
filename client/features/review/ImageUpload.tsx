// // Client-side (React)
import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await axios.post('http://localhost:8080/api/upload', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // <div className='testing'>
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </button>
    </div>
  );
};

export default ImageUpload;

