const express = require("express");
const router =express.Router();
const Note= require("../models/Note");
const jwt = require("jsonwebtoken");

// Auth middleware
const auth = async(req,res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message:"No auth token" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET ||"your-secret-key"
    );
    req.userId =decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({message: "Please authenticate" });
  }
};

// Get all notes for a user
router.get("/", auth, async (req,res) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message:"Error fetching notes" });
  }
});

// Get a single note
router.get("/:id", auth, async (req,res) => {
  try{
    const note = await Note.findOne({ _id: req.params.id, user: req.userId });
    if(!note) {
      return res.status(404).json({ message: "Note not found"});
    }
    res.json(note);
  }   catch (error) {
    res.status(500).json({ message: "Error fetching note" });
  }
});

// Create a note
router.post("/", auth, async(req, res) =>{
  try {
    const { title, content} = req.body;
    const note = new Note({
      title,
      content,
      user: req.userId,
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message:"Error creating note" });
  }
});

// Update a note
router.patch("/:id", auth,async (req, res) =>{
  try {
    const { title, content} = req.body;
    const note =await Note.findOne({ _id: req.params.id, user: req.userId });

    if (!note){
      return res.status(404).json({ message: "Note not found" });
    }

    if (title) note.title= title;
    if (content) note.content =content;

    await note.save();
    res.json(note);
  } catch (error){
    res.status(500).json({message: "Error  updating note" });
  }
});

// Delete a note
router.delete("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id : req.params.id,
      user:req.userId,
    });
    if (!note) {
      return res.status(404).json({message: " Note not found" });
    }
    res.json({message: "Note deleted " });
  } catch (error) {
    res.status(500).json({ message: "Error  deleting note"});
  }
});

module.exports =  router;
