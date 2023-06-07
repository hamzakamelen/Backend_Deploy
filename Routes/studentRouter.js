//IMPORT
const express = require("express");
const StudentController = require("../Controllers/studentController");
const route = express.Router();

// GET DATA with Pagination
route.get("/", StudentController.Pagination );

//Search with Pagination
route.post("/searchStd",StudentController.SearchWithPagination);

// GET DATA BY SPECIFIC ID
route.get("/:id",StudentController.getbyID);

// POST DATA
route.post("/",StudentController.PostData);

// Edit DATA
route.put("/:id",StudentController.EditData);

// DELETE DATA
route.delete("/:id",StudentController.DeleteData);
// ----------------------

// SEARCH API
route.get("/search",StudentController.Search);

//SEARCH MULTIPLE
// route.get("/searchfull", async (req, res) => {
//     let { firstName, LastName } = req.body
//     if (firstName && LastName) {
//         let result = await StudentModel.find({ firstName: firstName, LastName: LastName })
//         if (!result) {
//             res.send(sendResponse(false, null, "No Name Found")).status(404)
//         } else {
//             res.send(sendResponse(true, result)).status(404)
//         }
//     }
// })
// EXPORT
module.exports = route;
