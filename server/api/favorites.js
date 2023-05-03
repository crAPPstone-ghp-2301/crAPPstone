const router=require("express").router
const {models:{User, Restroom, Favorites, Ratings, Reviews, Comments} }=require("../db/index")

//find one user's favs
router.get('/:userId', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const fav = await Favorites.findAll({
        where: { userId: user.id }
      });
      
      return res.status(200).json(fav);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  });

//find how many people like one restroom 
router.get('/:restroomId', async (req, res) => {
    try {
      const restroom = await Restroom.findByPk(req.params.userId);
      if (!restroom) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const fav = await Favorites.findAll({
        where: { restroomId: restroom.id }
      });
      
      return res.status(200).json(fav);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  });


//user add one fav 
router.post("/:userId/add", async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const restroomId = req.body.productId;

      const [newrating, created] = await Favorites.findOrCreate({
        where: { restroomId: restroomId , userId:userId  },
        
      });
  
      if (!created) {
        console.log("already added")
      }
      res.status(200).json(newrating);
    } catch (error) {
      next(error);
    }
  });

//user delete one fav 
router.delete("/:userId/remove", async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const restroomId = req.body.productId;
  
      const rating = await Favorites.findOne({
        where: { restroomId: restroomId, userId : userId  },
      });
  
      if (rating) {
        await rating.destroy();
        res.status(204).end();
      } else {
        res.status(404).send("not found");
      }
    } catch (err) {
      next(err);
    }
  });
  

module.exports = router;