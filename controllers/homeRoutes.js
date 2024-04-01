const router = require('express').Router();
const { Comment, Post , User } = require('../models');
const withAuth = require('../utils/auth');

//get all//
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get by id//
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [ User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const post = postData.get({ plain: true });

    if(req.session.logged_in){
      if(post,user_id === req.session.user_id){
        return res.render('editpost' , {
          ...post,logged_in:true});
      }else{
        return res.render('post', {
          ...post,logged_in:true});
      }
    }else{
      return res.render('post',{
        ...post, logged_in:false})
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


//create new post//

router.get('/newpost', (req, res) => {
  res.render('newpost', {logged_in:true});
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post.comment }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user, logged_in: true});
  } catch (err) {
    res.status(500).json(err);
  }
});


// Login route
router.get('/login', (req, res) => {
  
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

// Signup route
router.get('/signup', (req, res) => {
  // Redirect logged-in users to dashboard
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
   // Render signup page for guests
   res.render('signup');
  });

module.exports = router;
