const { Router } = require("express");
const NotesModel = require("../models/Notes");
const NotesRouter = Router();

NotesRouter.get("/note", async (req, res) => {
  const userID_making_req = req.body.userID;
  try {
    let new_notes = await NotesModel.find();
    res.status(201).json({ Message: "get all the data", new_notes: new_notes, userID:userID_making_req});
  } catch (error) {
    console.log(error);
    res.status(401).json("someThing went wrong");
  }
});

NotesRouter.post("/create", async (req, res) => {
  const { title, note, category, userID } = req.body;
  try {
    const new_note = new NotesModel({ title, note, category, userID });
    await new_note.save();
    res.status(201).json({
      Message: "new Note data Create successfully",
      new_note: new_note,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json("someThing went wrong");
  }
});
// {
//     "title": "Full Stack ",
//     "note": "Today it is the fullStack CRUD Operation1",
//     "category": "Live Session1"
//   }
NotesRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const node = await NotesModel.findById(id);
  const userID_in_note = node.userID;
  const userID_making_req = req.body.userID;
  // console.log("userID_in_note",userID_in_note,"userID_making_req",userID_making_req)
  try {
    if (userID_making_req !== userID_in_note) {
      res.send({ message: "You are not authorized" });
    } else {
      const updatenotes = await NotesModel.findByIdAndUpdate(
        { _id: id },
        payload
      );
      updatenotes.save().then(() => {
        res
          .status(201)
          .json({ message: "Update Successfully", updatenotes: updatenotes });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json("someThing went wrong");
  }
});

NotesRouter.get("/get/:id", async (req, res) => {
  const id = req.params.id;
  const node = await NotesModel.findById(id);
  const userID_in_note = node.userID;
  const userID_making_req = req.body.userID;
  try {
    if (userID_in_note !== userID_making_req) {
      res.send({ message: "You are not authorized" });
    } else {
      const getidauth = await NotesModel.findById({ _id: id });
      res.status(200).json({
        message: "get data with id Successfully",
        getidauth: getidauth,
      });
    }
  } catch (error) {
    res.status(401).json(error.message);
    console.log(error);
  }
});
// {
//   "title":"Backend",
//   "note":"Today it is the fullStack CRUD Operation",
//   "category":"Live Session",
//   "author":"pulkit tiyagi"
// }

NotesRouter.delete("/deletedata/:id", async (req, res) => {
  const id = req.params.id;
  const node = await NotesModel.findById(id);
  const userID_in_note = node.userID;
  const userID_making_req = req.body.userID;
  try {
    if (userID_in_note !== userID_making_req) {
      res.send({ message: "You are not authorized" });
    } else {
      const deletenotes = await NotesModel.findByIdAndDelete({ _id: id });
      res.status(201).json({
        message: "deletenotes Successfully",
        deletenotes: deletenotes,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json("someThing went wrong");
  }
});

module.exports = NotesRouter;
