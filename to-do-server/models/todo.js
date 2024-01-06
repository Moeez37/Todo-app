const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const toDoSchema = new Schema({
    title: {
        type : String,
        required : true,
    },
    date:{
        type : Date,
        required : true,
    },
    status:{
        type : Boolean,
        required : true,
    },
});
module.exports = mongoose.model('todo',toDoSchema);