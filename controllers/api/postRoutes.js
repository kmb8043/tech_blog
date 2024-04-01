const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});


router.put('/:id', withAuth, async(req,res) => {
  try{
    const updatePost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where:{
          id: req.params.id,
        }
      });

      if(updatePost[0] > 0)
      {
        res.status(200).json({message: 'Post updated'});
      } else {
        res.status(404).json({message: 'No post found'});
      }
      }catch(err){
        res.status(400).json(err);
      }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found' });
      return;
    }

    res.status(200).json({message: 'Post deleted'});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;