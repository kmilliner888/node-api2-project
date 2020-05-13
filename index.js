const express = require('express');
const shortid = require('shortid');
const Data = require('./data/db');

const server = express();

server.use(express.json());

server.post('/api/posts', (req, res) => {
    Data.insert(req.body)
        .then(post => res.status(201).json(post))
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
})

server.post('/api/posts/:id/comments', async (req, res) => {
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

server.get('/api/posts', (req, res) => {
    Data.find(req.query)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The posts information could not be retrieved." })
        });
});

server.get('/api/posts/:id', (req, res) => {
    Data.findById(req.params.id)
        .then(data => {
            if(data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist."})
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The post information could not be retrieved." })
        });
});

server.get('/api/posts/:id/comments', (req, res) => {
    Data.findPostComments(req.params.id)
        .then(comment => res.status(201).json(comment))
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The post with the specified ID does not exist."})
        })
});

server.delete('/api/posts/:id', (req, res) => {
    Data.remove(req.params.id)
        .then(data => {
            if(data > 0) {
                res.status(200).json({message: "removed"});
            } else {
                res.status(404).json({message:"not found"});
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The post information could not be retrieved." })
        });
});

server.put('/api/posts/:id', (req, res) => {
    // const {id} = req.params;
    const changes = req.body;
    Data.update(req.params.id, changes)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(error => {
            res.status(500).json({message: "error updating post"});
        })
 });
    


const PORT = 5000;

server.listen(PORT, () => {
    console.log(`listening on localhost:${PORT}`)
});