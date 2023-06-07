const express = require("express")
const CourseModel = require("../models/CourseModel")
const { sendResponse } = require("../helper/helper");
const CourseController = require("../Controllers/CourseController");
const route =  express.Router()


route.get("/",CourseController.Pagination );
route.get('/:id',CourseController.getbyID)
route.post('/',CourseController.PostData)
route.put('/:id',CourseController.EditData)
route.delete('/:id',CourseController.DeleteData)

module.exports=route