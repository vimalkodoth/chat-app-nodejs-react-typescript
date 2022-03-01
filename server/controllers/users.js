import express from "express";
import { getUsers } from "../models/users.js";
import { findUserByRoomAndName } from "../utils/users.js";

const router = express.Router();

router.get("/:room/:nickname", (req, res) => {
  const { nickname, room } = req.params;
  if (!nickname || !room) {
    res.status(403), json({ error: "Please provide userId and group" });
  }
  const user = findUserByRoomAndName(nickname, room, getUsers());
  if (!user) {
    return res.json({ status: "OK" });
  }
  res.status(403), res.json({ error: "User already exists" });
});

export default router;
