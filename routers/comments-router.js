const express = require('express');
const Data = require('../data/db');

const router = express.Router();


router.post('/:id/comments', async (req, res) => {
    const commentInfo = {...req.body, post_id: req.params.id}
    try {
        const comment = await Data.insertComment(commentInfo);
        res.status(201).json(comment);
    }   
    catch (error) {
            console.log(error);
            res.status(500).json({ error: "There was an error while saving the comment to the database" })
    }
});
router.get('/:id/comments', (req, res) => {
    Data.findPostComments(req.params.id)
        .then(comment => res.status(201).json(comment))
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The post with the specified ID does not exist."})
        })
});

module.exports = router;