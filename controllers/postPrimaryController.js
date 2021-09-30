const Express = require("express"); // Gateway to using Express methods.
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { PostPrimaryModel } = require("../models");
const { PostSecondaryModel } = require("../models");

// Create Primary Post
router.post("/create", validateJWT, async (req, res) => {
    const { date, genre, post, thoughts } = req.body.postprimary; //change
    const { id } = req.user;
    const logEntry = {
        date,
        genre,
        post,
        thoughts,
        owner_id: id
    }
    try {
        const newLog = await PostPrimaryModel.create(logEntry);
        res.status(200).json(newLog);
    } catch (err) {
        res.status(500).json({ error: err })
    }
});

// Get all logs
router.get("/all", async (req, res) => {
    try {
        const events = await PostPrimaryModel.findAll({include: PostSecondaryModel});
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Get logs by user_id
router.get("/mine", validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
        const userLog = await PostPrimaryModel.findAll({
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
    const { date, genre, post, thoughts } = req.body.postprimary; //change
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
        post: post,
        thoughts: thoughts
    };

    try {
        const update = await PostPrimaryModel.update(updatedLog, query);
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

        await PostPrimaryModel.destroy(query);
        res.status(200).json({ message: "Log Entry Removed" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;