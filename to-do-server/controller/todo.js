const ToDo = require('../models/todo');
const mongoose = require("mongoose");
const log = require("../logger/log")
exports.addNewTodo = (req, res, next) => {
  log.info("in addNewTodo")

  try{
    const { title, date, status } = req.body;
    const toDo = new ToDo({
      title: title,
      date: date,
      status: status,
    });
    toDo.save()
      .then(result => {
        log.info(`Created ToDo:', ${result}`);
        log.info("succesfully added Todo now going to get all Todos");
        res.status(200).json({id:result._id});
        })
      .catch(err => {
        log.error(`Error creating ToDo:, ${err}`);
        res.status(500).json({ error: err });
    });
  }catch(e){
      console.log(e);
    }
};

exports.getTodo = (req, res, next) => {
  log.info("in getTodo")
  try{
  ToDo.find()
    .then(todos => {
      log.info("successfully retrived Todos")
      res.status(200).json({ todos: todos });
    })
    .catch(err => {
      log.error(`Error fetching ToDos:', ${err}`);
      res.status(500).json({ error: err });
    });}
    catch(e){
      console.log(e);
    }
};

exports.updateToDo = (req, res, next) => {
  try{
    log.info("in updateToDO Function")
    const id = req.params.id;
    const updateOps = {};
    
    (!id)?res.status(400).json({message:"id not found"}):null;

    for (const [key,value] of Object.entries(req.body)) {
      updateOps[key] = value;
    }
 
    ToDo.updateOne({ _id:new mongoose.Types.ObjectId(id) }, { $set: updateOps })
      .exec()
      .then(result => {
        log.info(`ToDo updated: ${JSON.stringify(result)}`)
        res.status(200).json({ message: 'ToDo updated' });
      })
      .catch(err => {
        log.error(`Error updating ToDo:, ${err}`);
        res.status(400).json({ error: err });
      });}
      catch(e){
        log.error(err)
      }

};

exports.deleteTodo = (req, res, next) => {
  const id = req.params?.id;
try{
  (!id)?res.status(400).json({message:"id not found"}):null;

  ToDo.deleteOne({ _id:new mongoose.Types.ObjectId(id) })
    .exec()
    .then(result => {
      log.info(`ToDo deleted:, ${JSON.stringify(result)}`);
      res.status(200).json({ message: 'ToDo deleted' });
    })
    .catch(err => {
      log.error(`Error Deleting ToDo:, ${err}`);
      res.status(500).json({ error: err });
    });}
    catch(e){
      log.error(e);
    }

};
