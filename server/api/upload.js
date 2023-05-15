const router = require('express').Router();
const axios = require('axios');

// POST route to handle image upload
router.post('/', async (req, res) => {
  try {
    const { image } = req.body;
    console.log(image);

    const response = await axios.post('https://api.imgur.com/3/image', { image }, {
      headers: {
            Authorization: 'Client-ID 91a98f0e968c4ed',
      },
    });

    const imageUrl = response.data.data.link;
    console.log('Image uploaded:', imageUrl);

    res.json({ imageUrl });
      
  } catch (error) {
    console.error('Image upload failed:', error);
    res.sendStatus(500);
  }
});

module.exports = router;

