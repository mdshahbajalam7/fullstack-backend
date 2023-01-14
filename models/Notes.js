const {Schema,model}=require("mongoose")

const NotesSchema = new Schema({
    title:String,
    note:String,
    category:String,
    userID:String,
})
 
const NotesModel = model("note",NotesSchema)
module.exports = NotesModel