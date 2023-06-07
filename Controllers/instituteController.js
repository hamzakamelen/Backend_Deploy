const sendResponse  = require("../helper/helper");
const InstituteModel = require("../models/instituteModel");

const InstituteController = {
// GET Institute
getInstitute:async (req, res) => {
        try{
        const result = await InstituteModel.find()
        if(!result){
            res.send(sendResponse(false,null,"Data Not Found")).status(404)
        }else{
            res.send(sendResponse(true,result)).status(200)
        }
    }
    catch(err){
        res.send(sendResponse(false,null,"internal Server Error",err)).status(400)
    }  
        // res.send("Get All Institute Data")
    },
// GET With Pagination
Pagination: async (req, res) => {
    try {
      const { page, limit } = req.query;
      const startIndex = (page - 1) * limit;
  
      const Institutes = await InstituteModel.find()
        .skip(startIndex)
        .limit(limit);
  
      const totalInstitutes = await InstituteModel.countDocuments();
  
      res.json({
        data: Institutes,
        page,
        totalPages: Math.ceil(totalInstitutes / limit),
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
getbyID:async (req, res) => {
    try{
     let id = req.params.id;
     let result = await InstituteModel.findById(id);
     if(!result){
         res.send(sendResponse(false,null,"Data Not Found")).status(404);
     }else{
         res.send(sendResponse(true,result,"Successfull")).status(200)
     }
    }
 catch(err){
     res.send(sendResponse(false,null,"Internal Error",err)).status(400);
 }
     // res.send("Get Single Institute Data")
 },
//POST DATA
PostData: async (req, res) => {
    const {InstituteName,InstituteLocation,ShortName,contact} = req.body
    try{
let ErrorArray = []
    if(!InstituteName){
        ErrorArray.push("Required : Institute Name")
    }
    if(!InstituteLocation){
        ErrorArray.push("Required : Institute Location")
    }
    if(!ShortName){
        ErrorArray.push("Required : Institute ShortName")
    }
    if(!contact){
        ErrorArray.push("Required : Institute Contact")
    }
    if(ErrorArray.length>0){
        res.send(sendResponse(false,null,"Required Data",ErrorArray))
    }else{
        let obj = {InstituteName,InstituteLocation,ShortName,contact}
        let institutedata = new InstituteModel(obj);
        await institutedata.save()
        if(!institutedata){
            res.send(sendResponse(false,null,"Data Not Found")).status(404)
        }else{
        res.send(sendResponse(true,institutedata,"Saved Successfully")).status(200)
        }
    }
}catch(err){
    res.send(sendResponse(false,null,"internal Server Error",err)).status(404)
}
    // res.send("Post Institute Data")
},
// Edit DATA
EditData:async (req, res) => {
    try{
        let id = req.params.id
        let result = await InstituteModel.find(id)
        if(!result){
            res.send(sendResponse(false,null,"Not Found")).status(404)
        }else{
            let updateResult = await InstituteModel.findByIdAndUpdate(id,req.body,{new:true})
            if(!updateResult){
                res.send(sendResponse(false,null,"Error")).status(404)
            }else{
                res.send(sendResponse(true,updateResult,"Updated Successful")).status(200)
            }
        }
    }catch(err){
        res.send(sendResponse(false,null,"Internal Server Error",err)).status(400)
    }
    // res.send("Edit Institute Data")
},
//Delete Data
DeleteData:async (req, res) => {
    try{
        let id = req.params.id
        let result = await InstituteModel.findById(id)
        if(!result){
            res.send(sendResponse(false,null,"Data Not Found")).status(404)
        }else{
            let deleteResult = await InstituteModel.findByIdAndDelete(id)
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
module.exports = InstituteController;