const express = require('express');
const router = express.Router();
const axios = require('axios');
const FormData = require('form-data');
const multer = require('multer');

// Configure multer storage
const storage = multer.memoryStorage(); // Use memory storage to handle file data in memory
const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const formData = new FormData();
    formData.append('image', req.file.buffer); // Access file buffer using req.file.buffer

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.imgur.com/3/image',
      headers: {
        'Authorization': 'Bearer 7cc9f7db481f6f0ee6c96c5339fbdfafb35f1e10',
        ...formData.getHeaders()
      },
      data: formData
    };

    const response = await axios.request(config);
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while uploading the image' });
  }
});

module.exports = router;
