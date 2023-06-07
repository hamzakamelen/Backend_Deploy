const sendResponse = require("../helper/helper");
const CourseModel = require("../models/CourseModel");

const CourseController = {
// GET Courses
getCourses: async (req, res) => {
        try{
            const result = await CourseModel.find()
            if(!result){
                res.send(sendResponse(false,null,"Data Not Found")).status(404)
            }else{
                res.send(sendResponse(true,result)).status(200)
            }
        }catch(err){
            res.send(sendResponse(false,null,"Internal Server Error",err)).status(400)
        }
    },
// GET With Pagination
Pagination:async (req, res) => {
    try {
      const { page, limit } = req.query;
      const startIndex = (page - 1) * limit;
  
      const Courses = await CourseModel.find()
        .skip(startIndex)
        .limit(limit);
  
      const totalCourses = await CourseModel.countDocuments();
  
      res.json({
        data: Courses,
        page,
        totalPages: Math.ceil(totalCourses / limit),
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
      let result = await CourseModel.find({ [SearchEntity]: SearchVal })
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
getbyID: async(req,res)=>{
    try{
        let id = req.params.id;
        let result = await CourseModel.findById(id)
        if(!result){
            res.send(sendResponse(false,null,"Data Not Found")).status(404)
        }else{
            res.send(sendResponse(true,result,"Successful")).status(200)
        }
    }catch(err){
        res.send(sendResponse(false,null,"Internal Server Error",err)).status(400)
    }
},
//POST DATA
PostData: async (req, res) => {
    let {Name,Duration,Fees,ShortName} = req.body
    try{
        let ErrArr = []
        if(!Name){
            ErrArr.push("Required Name")
        }if(!Duration){
            ErrArr.push("Required Duration")
        }if(!Fees){
            ErrArr.push("Required Fees")
        }
        if(!ShortName){
            ErrArr.push("Required ShortName")
        }
        if(ErrArr.length>0){
            res.send(sendResponse(false,null,"Required Data",ErrArr))
        }    else{
            let obj = {Name,Duration,Fees,ShortName}
            const Courses = new CourseModel(obj)
            await Courses.save()
            if(!Courses){
                res.send(sendResponse(false,null,"Internal server Error")).status(400)
            }else{
                res.send(sendResponse(true,Courses,"Saved Successfully")).status(200)
            }
        }
    }
    catch(err){
        res.send(sendResponse(false,null,"Internal server Error",err)).status(400)

    }
},
// Edit DATA
EditData:async (req, res) => {
    try{
        let id = req.params.id
        let result = await CourseModel.findById(id)
        if(!result){
            res.send(sendResponse(false,null,"Data Not Found")).status(404)
        }else{
            let updateResult = await CourseModel.findByIdAndUpdate(id, req.body,{new:true})
            if(!updateResult){
                res.send(sendResponse(false,null,"Error")).status(400)
            }else{
            res.send(sendResponse(true,updateResult,"Update Successful")).status(200)
        }}
    }catch(err){
        res.send(sendResponse(false,null,"internal Server Error",err))
    }
},
//Delete Data
DeleteData: async (req, res) => {
    try{
        let id = req.params.id
        let result = await CourseModel.findById(id)
        if(!result){
            res.send(sendResponse(false,null,"Data Not Found")).status(404)
        }else{
            let deleteResult = await CourseModel.findByIdAndDelete(id)
            if(!deleteResult){
                res.send(sendResponse(false,null,"Error")).status(404)
            }else{
                res.send(sendResponse(true,null,"Deleted Successfully")).status(200)
            }
        }
    }catch(err){
        res.send(sendResponse(false,null,"Internal Server Error",err)).status(400)
    }
}
// --------------
//Search
// Search:  async (req, res) => {
//   try {
//     let { firstName } = req.body;
//     if (firstName) {
//       let rESULT = await CourseModel.find({ firstName });
//       if (!rESULT) {
//         res.send(sendResponse(false, null, "No Name Found")).status(404);
//       } else {
//         res.send(sendResponse(true, rESULT)).status(200);
//       }
//     } else {
//       res.send(sendResponse(false, null, "INternal Error")).status(400);
//     }
//   } catch (err) {
//     console.log("Error ======>", err);
//     res.send(sendResponse(false, null, "INternal Error", err)).status(404);
//   }
// }
}
module.exports = CourseController;