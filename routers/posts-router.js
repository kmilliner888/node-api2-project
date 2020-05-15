const express = require('express');
const Data = require('../data/db');

const router = express.Router();

router.post('/', (req, res) => {
    Data.insert(req.body)
        .then(post => res.status(201).json(post))
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
});

router.get('/', (req, res) => {
    Data.find(req.query)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The posts information could not be retrieved." })
        });
});

router.get('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

router.put('/:id', (req, res) => {
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

 module.exports = router;