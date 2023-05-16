const express = require('express');
const router = express.Router();
const axios = require('axios');
const FormData = require('form-data');
const multer = require('multer');
require('dotenv').config();

const imgurAccessToken = process.env.IMGUR_ACCESS_TOKEN;

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const formData = new FormData();
    formData.append('image', req.file.buffer); 

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.imgur.com/3/image',
      headers: {
        'Authorization': `Bearer ${imgurAccessToken}`,
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
