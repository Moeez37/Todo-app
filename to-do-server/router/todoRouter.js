const express = require('express');
const todocontroller = require('../controller/todo'); 
const router = express.Router();

router.get('/todo', todocontroller.getTodo);
router.post('/todo/new',todocontroller.addNewTodo);
router.put('/todo/:id',todocontroller.updateToDo);
router.delete('/todo/:id',todocontroller.deleteTodo); //we can aslo used another url to distinguish which but we are using delet http type to delet

module.exports = router 