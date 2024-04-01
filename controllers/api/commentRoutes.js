const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment } = require('../../models');

router.post('/', withAuth, async (req, res) => {
    try {
        const makeComment = await Comment.create({
            commentBody: req.body.commentBody,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        });
        res.status(200).json(makeComment);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});

router.delete('/:id', withAuth, async(req, res) =>{
    try {
        const commentData = await Comment.destory({
            where:{
                id: req.params.id,
                user_id: req.session.user_id,
            }
        })
        if(!commentData){
            res.status(400).json({message: 'No post found'});
            return;
        }
        res.status(200).json(commentData)
    } catch (error) {
        res.status(500).json(err);
        console.log(err);
    }
})


module.exports = router;
