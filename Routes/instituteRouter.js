//IMPORT
const express = require("express");
const InstituteController = require("../Controllers/instituteController");

const route = express.Router();

// GET DATA With Paginaton
route.get("/",InstituteController.Pagination);

// GET DATA BY SPECIFIC ID
route.get('/:id',InstituteController.getbyID)
// ----------------------
// POST DATA
route.post('/',InstituteController.PostData)
// ----------------------
// PUT DATA
route.put('/:id',InstituteController.EditData)
// ----------------------

// DELETE DATA
route.delete('/:id',InstituteController.DeleteData)
// ----------------------


// EXPORT
module.exports = route;