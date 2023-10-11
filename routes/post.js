//const express = require('express')
const router = require('express').Router()
const {Post, validatePost} = require('../models/post')
const auth = require('../middleware/auth')

router.get('/', auth, async (req,res) => {
    
    const posts = await Post.find();
    res.send(posts);
    })
    
    router.post('/', auth, async (req,res) => {
        const { error } = validatePost(req.body);
        if (error) return res.sendStatus(400).json(error.details[0].message);
        
        const post = new Post(req.body);
        post.save();

        res.send(post);
    })
    
    router.get('/:id', auth, async (req,res) =>{
    
        const post = await Post.findById(req.params.id);
        if (post) return res.send(post);
        res.sendStatus(404)
    })

    router.delete('/:id', auth, async (req,res) =>{
    
       const result = await Post.deleteOne({_id: req.params.id});
       res.send(result);
    });

    module.exports = router;