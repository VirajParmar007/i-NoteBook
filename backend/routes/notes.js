const { Router } = require('express');
const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const router = express.Router();
const { body, validationResult } = require('express-validator');



//ROUTE 1: Get all the notes using: GET "/api/notes/fetchallnotes" Login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes)
})

//ROUTE 2: Adding new notes using: POST "/api/notes/addnote" Login required

router.post('/addnote', fetchuser, [
    body('title', 'Title must not be empty').isLength({ min: 0}),
    body('description', 'Description must not be empty').isLength({ min: 0 }),
], async (req, res) => {

    try {

        // If there are errors, return Bad request and the errors

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //Creating a new note

        const notes = await Notes.create({
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
            user: req.user.id
        })
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})


//ROUTE 3: Updating an existing Note using: PUT "/api/notes/updatenote/:id" Login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {

        //Create a newNote object

        const newNote = {};
        if (req.body.title) { newNote.title = req.body.title }
        if (req.body.description) { newNote.description = req.body.description }
        if (req.body.tag) { newNote.tag = req.body.tag }

        //Find a note to be updated

        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send("Not found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})

//ROUTE 4: Deleting an existing Note using: DELETE "/api/notes/deletenote/:id" Login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {

        //Find a note to be deleted
        let note = await Notes.findById(req.params.id)
        if (!note) { return res.status(404).send("Not found") }

        //Allow to delete if user is author of that note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "status": "Note has been deleted", note: note })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})


module.exports = router