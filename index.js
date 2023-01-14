const express = require("express");
const cors = require("cors");
const connection = require("./database/db");
const AuthRouter = require("./Router/Authusers");
const NotesRouter = require("./Router/notesRouter");
const authenticate = require("./middleware/authenticate")
const app = express();
require('dotenv').config()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("FullStack-Mini-Project");
});

app.use("/auth", AuthRouter);
app.use(authenticate)
app.use("/note", NotesRouter);

app.listen(process.env.PORT, async () => {
  await connection;
  console.log(`Database connect to server`);
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
