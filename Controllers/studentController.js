
const sendResponse = require("../helper/helper");
const StudentModel = require("../models/studentModel");

const StudentController = {
// GET Students
getStudents:async (req, res) => {
        try {
            const result = await StudentModel.find()
            if (!result) {
                res.send(sendResponse(false, null, "Data Not Found"))
                    .status(404);
            } else {
                res.send(sendResponse(true, result))
                    .status(200);
            }
        } catch (err) {
            console.log(err)
            res.send(sendResponse(false, null, "Internal server Error")).status(400);
        }
},
// GET With Pagination
Pagination: async (req, res) => {
    try {
      const { page, limit } = req.query;
      const startIndex = (page - 1) * limit;
  
      const students = await StudentModel.find().skip(startIndex).limit(limit);
  
      const totalStudents = await StudentModel.countDocuments();
  
      res.json({
        data: students,
        page,
        totalPages: Math.ceil(totalStudents / limit),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
},
//Search with Pagination
SearchWithPagination: async (req, res) => {
    try {
      let { pageNo, pageSize, SearchEntity, SearchVal } = req.body;
      let result = await StudentModel.find({ [SearchEntity]: SearchVal })
        .skip((pageNo - 1) * pageSize)
        .limit(pageSize);
      if (result) {
        res.send(sendResponse(true, result));
      } else {
        res.send(sendResponse(false, null, "No Data Found"));
      }
      // {
      //     "pageNo":1,
      //     "pageSize":3,
      //     "SearchEntity":"firstName",
      //     "SearchVal":"Talha"
      //   }
    } catch {}
},
//getbyID
getbyID: async (req, res) => {
  try {
    let id = req.params.id;
    const result = await StudentModel.findById(id);
    if (!result) {
      res.send(sendResponse(false, null, "Data Not Found")).status(404);
    } else {
      res.send(sendResponse(true, result)).status(200);
    }
  } catch (err) {
    console.log(err);
    res.send(sendResponse(false, null, "Internal server Error")).status(400);
  }
  // res.send("Get Single Student Data")
},
//POST DATA
PostData: async (req, res) => {
  let { firstName, LastName, contact, Course, password, Email } = req.body;
  try {
    let errArr = [];
    if (!firstName) {
      errArr.push("Required : FirstName");
    }
    if (!Email) {
      errArr.push("Required : FirstName");
    }
    if (!password) {
      errArr.push("Required : FirstName");
    }
    if (!contact) {
      errArr.push("Required : Contact");
    }
    if (!Course) {
      errArr.push("Required : Course");
    }
    if (errArr.length > 0) {
      res.send(false, null, "Required", errArr);
    } else {
      let obj = { firstName, LastName, Email, password, contact, Course };
      let student = new StudentModel(obj);
      await student.save();
      if (!student) {
        res
          .send(sendResponse(false, null, "Internal Server Error"))
          .status(400);
      } else {
        res.send(sendResponse(true, student, "Saved Succesfully")).status(200);
      }
    }
  } catch (err) {
    res
      .send(sendResponse(false, null, "Internal Server Error", err))
      .status(404);
  }
  // res.send("Post Student Data")
},
// Edit DATA
EditData:async (req, res) => {
  try {
    let id = req.params.id;
    let result = await StudentModel.findById(id);
    if (!result) {
      res.send(sendResponse(false, null, "No Data Found")).status(400);
    } else {
      let updateResult = await StudentModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updateResult) {
        res.send(sendResponse(false, null, "Error")).status(400);
      } else {
        res
          .send(sendResponse(true, updateResult, "Updated Successfully"))
          .status(200);
      }
    }
  } catch (err) {
    res.send(sendResponse(false, null, "Error")).status(404);
  }

  // res.send("Edit Students Data")
},
//Delete Data
DeleteData:  async (req, res) => {
  try {
    let id = req.params.id;
    let result = await StudentModel.findById(id);
    if (!result) {
      res.send(sendResponse(false, null, "No Data on this id")).status(404);
    } else {
      let deleteResult = await StudentModel.findByIdAndDelete(id);
      if (!deleteResult) {
        res.send(sendResponse(false, null, "Error")).status(400);
      } else {
        res.send(sendResponse(true, null, "Deleted Successfully")).status(200);
      }
    }
  } catch {
    res.send(sendResponse(false, null, "Error")).status(404);
  }
  // res.send("Delete Student Data")
},
//Search
Search:  async (req, res) => {
  try {
    let { firstName } = req.body;
    if (firstName) {
      let rESULT = await StudentModel.find({ firstName });
      if (!rESULT) {
        res.send(sendResponse(false, null, "No Name Found")).status(404);
      } else {
        res.send(sendResponse(true, rESULT)).status(200);
      }
    } else {
      res.send(sendResponse(false, null, "INternal Error")).status(400);
    }
  } catch (err) {
    console.log("Error ======>", err);
    res.send(sendResponse(false, null, "INternal Error", err)).status(404);
  }
}
}
module.exports = StudentController;