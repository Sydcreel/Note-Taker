const router = require("express").Router();
const {notes, nextId} = require("../../db/db.json");
const {addNote, validateNote, deleteNote} = require("../../lib/notes");

router.get("/notes", (req, res) => {
    res.json(notes);
});

router.post("/notes", (req, res) => {
    req.body.id = nextId;

    if (!validateNote(req.body)) {
        res
        .status(400)
        .send(
            "Please enter a note title AND a note."
        );
    } else {
        const note = addNote(req.body, notes);
        res.json(req.body);
    }
});

router.delete("/notes/:id", (req, res) => {
    let deleteId = parseInt(req.params.id);
    let deleteIndex = notes.findIndex((x) => {
        return x.id === deleteId;
    });

    if (deleteIndex === -1) {
        res.sendStatus(404);
    } else {
        deleteNote(deleteIndex, notes, nextId);
        res.status(200).json({
            code: 200,
            message: "Deleted",
            noteId: deleteId,
        });
    }
});

module.exports = router;