const router=require("express").router
const {models:{User, Restroom, Favorites, Ratings, Reviews, Comments} }=require("../db/index")

//get ratings made by user
router.get('/:userId', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const rate = await Ratings.findAll({
        where: { userId: user.id }
      });
      
      return res.status(200).json(rate);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
  //get restroom rating 
  router.get('/:restroomId', async (req, res) => {
    try {
      const restroom = await Restroom.findByPk(req.params.userId);
      if (!restroom) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const rate = await Ratings.findAll({
        where: { restroomId: restroom.id }
      });
      
      return res.status(200).json(rate);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  });

  //user add the rating 

  
