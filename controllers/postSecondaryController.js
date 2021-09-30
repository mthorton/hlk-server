const Express = require("express"); // Gateway to using Express methods.
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { PostSecondaryModel } = require("../models");

// Create Primary Post
router.post("/create", validateJWT, async (req, res) => {
    const { date, post, thoughts, postprimaryId } = req.body.postsecondary; //change
    const { id } = req.user;
    const logEntry = {
        date,
        post,
        thoughts,
        postprimaryId,
        owner_id: id,
    }
    try {
        const newLog = await PostSecondaryModel.create(logEntry);
        res.status(200).json(newLog);
    } catch (err) {
        res.status(500).json({ error: err })
    }
});

// Get all logs
router.get("/all/:id", async (req, res) => {
    // const { postprimaryId } = req.postSecondary;
    const postId = req.params.id

    try {
        const posts = await PostSecondaryModel.findAll({
            where: {
                postprimaryId: postId
            }
        });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Get logs by user_id
router.get("/mine", validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
        const userLog = await PostSecondaryModel.findAll({
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
    const { date, post, thoughts } = req.body.postsecondary; //change
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
        post: post,
        thoughts: thoughts
    };

    try {
        const update = await PostSecondaryModel.update(updatedLog, query);
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

        await PostSecondaryModel.destroy(query);
        res.status(200).json({ message: "Log Entry Removed" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;