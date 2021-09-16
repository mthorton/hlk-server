const Express = require("express"); // Gateway to using Express methods.
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { LogModel } = require("../models");

// Create log
router.post("/create", validateJWT, async (req, res) => {
    const { date, genre, content, thoughts } = req.body.log;
    const { id } = req.user;
    const logEntry = {
        date,
        genre,
        content,
        thoughts,
        owner_id: id
    }
    try {
        const newLog = await LogModel.create(logEntry);
        res.status(200).json(newLog);
    } catch (err) {
        res.status(500).json({ error: err })
    }
    LogModel.create(logEntry)
});

// Get all logs
router.get("/all", async (req, res) => {
    try {
        const events = await LogModel.findAll();
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Get logs by user_id
router.get("/mine", validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
        const userLog = await LogModel.findAll({
            where: {
                owner_id: id
            }
        });
        res.status(200).json(userLog);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Update a log
router.put("/update/:id", validateJWT, async (req, res) => {
    const { date, genre, content, thoughts } = req.body.log;
    const logId = req.params.id;
    const userId = req.user.id;

    const query = {
        where: {
            id: logId,
            owner_id: userId
        }
    };

    const updatedLog = {
        date: date,
        genre: genre,
        content: content,
        thoughts: thoughts
    };

    try {
        const update = await LogModel.update(updatedLog, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err});
    }
});

// Delete a log
router.delete("/delete/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const logId = req.params.id;

    try {
        const query = {
            where: {
                id: logId,
                owner_id: ownerId
            }
        };

        await LogModel.destroy(query);
        res.status(200).json({ message: "Log Entry Removed" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;

/*

let express = require('express')
let router = express.Router()
const { PostPrimary, User } = require('../models')

router.post("/create/", async(req, res) => {
    let message;

    try{
        let u = await User.findOne({ where: { id: req.body.id } })
        if (u) {
            let post = await PostPrimary.create({ content: req.body.content })
            await u.addPost(post)

            let { id, content } = await PostPrimary.findOne({ where: { id: post.id } })
            message = { message: "Post made!", data: { id, content }}    
        }
        else {
            message = { message: "Can't make a post, user does not exist", data: null }
        }

    } catch(err) {
        message = { message: "Post Primary Create Failed" }
    }

    res.json(message)

})

router.get("/all/:id", async(req, res) => {
    let u = await User.findOne({ where: { id: req.params.id }})
    let posts = u ? await u.getPosts() : null
    if (posts){
        let cleaned_posts = posts.map( p => {
                    const { id, content } = p
                    return { id, content }
        })

        res.send(cleaned_posts)
    }
    else
        res.send(posts)
})

module.exports = router

*/