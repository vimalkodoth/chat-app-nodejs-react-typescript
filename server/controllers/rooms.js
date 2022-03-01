import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  const rooms = ["technology", "friendly", "review"];
  res.status(200).json({ rooms });
});

export default router;
