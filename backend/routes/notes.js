import express from "express";
import {
  createNote,
  deleteNoteById,
  getAllNotes,
  getNoteById,
  searchNotes,
  shareNote,
  updateNoteById,
} from "../controllers/notes.js";

import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.use(authenticateUser);
router.get("/notes", getAllNotes);
router.get("/notes/:id", getNoteById);
router.get("/search", searchNotes);
router.post("/notes", createNote);
router.post("/notes/:id/share", shareNote);
router.put("/notes/:id", updateNoteById);
router.delete("/notes/:id", deleteNoteById);

export default router;
