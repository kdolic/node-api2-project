// implement your posts router here
const express = require('express')

const router = express.Router()

const Post = require('./posts-model')

// [GET] /api/posts - Returns an array of all the post objects contained in the database
router.get('/api/posts', (req, res) => {
    Post.find()
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "The posts information could not be retrieved"})
    })
})

// [GET] /api/posts/:id	- Returns the post object with the specified id
router.get('/api/posts/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(post => {
        if(post){
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "The post information could not be retrieved" })
    })
})

// [POST] /api/posts - Creates a post using the information sent inside the request body and returns the newly created post object
router.post('/api/posts', (req, res) => {
    const newPost = req.body
    
    if(!newPost.title || !newPost.contents){
        res.status(400).json({ message: "Please provide title and contents for the post"})
    } else {
        Post.insert(newPost)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error while saving the post to the database" })
        })
    }
})

// [PUT] /api/posts/:id	- Updates the post with the specified id using data from the request body and returns the modified document, not the original
router.put('/api/posts/:id', (req, res) => {
    const changes = req.body
    const id = req.params.id 
    
    Post.update(id, changes)
    .then(update => {
        if(!update){
            res.status(200).json(update)
        } else if(!req.title || !req.contents){
            res.status(400).json({ message: "Please provide title and contents for the post" })
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }
    })
    .catch(err => {
        res.status(500).json({ message: "The post information could not be modified" })
    })
 })

// [DELETE] /api/posts/:id - Removes the post with the specified id and returns the deleted post object
router.delete('/api/posts/:id', (req, res) => {
    Post.remove(req.params.id)
    .then(post => {
        if(!post){
            res.status(404).json({ message: 'The post with the specified ID does not exist' })
        } else {
            res.status(200).json(post)
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "The post could not be removed" })
    })
})

// [GET] /api/posts/:id/comments - Returns an array of all the comment objects associated with the post with the specified id
router.get('/api/posts/:id/comments', (req, res) => {
    Post.findPostComments(req.params.id)
    .then(post => {
        if(!post){
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else {
            res.status(200).json(post)
        }
    })
    .catch(err => {
        res.status(500).json({ message: "The comments information could not be retrieved" })
    })
})

module.exports = router