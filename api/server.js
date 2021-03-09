// implement your server here
// require your posts router and connect it here

const express = require('express')
const server = express()

const Post = require('./posts/posts-model')

server.use(express.json())


// [GET] /api/posts - Returns an array of all the post objects contained in the database
server.get('/api/posts', (req, res) => {
    Post.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "The posts information could not be retrieved"})
    })
})

module.exports = server