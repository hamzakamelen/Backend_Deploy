//IMPORT
const express = require("express");
const TeacherController = require("../Controllers/teacherController");
const route = express.Router();

// GET DATA with Pagination
route.get("/",TeacherController.Pagination);

// GET DATA BY SPECIFIC ID
route.get('/:id',TeacherController.getbyID)
// ----------------------

// POST DATA
route.post('/', TeacherController.PostData)
// ----------------------

// Edit DATA
route.put('/:id',TeacherController.EditData)
// ----------------------

// DELETE DATA
route.delete('/:id',TeacherController.DeleteData)
// ----------------------


// EXPORT
module.exports = route;