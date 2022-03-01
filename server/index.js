import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import routes from "./controllers/index.js";
import chat from "./services/chat.js";

const app = express();
app.use(cors());
app.use("/rooms", routes.rooms);
app.use("/users", routes.users);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

chat(io);

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.info("Server is running...");
});
