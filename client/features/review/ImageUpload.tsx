import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      console.log(formData);
  
      const response = await axios.post('https://api.imgur.com/3/image', formData);
      // console.log("dataaaaaaaaaaaaaaaaaaaaaaaaa", response.data); 
  
      console.log('Image uploaded successfully');
    
  
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };
  

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUpload;

