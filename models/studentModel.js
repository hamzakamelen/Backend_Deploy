const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true
    },
    LastName:{
        type: String,
        required:true
    },
    contact:{
        type: String,
        required:true
    },
    Email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true    
    },
    Course:{
        type: String,
        required:true
    }
})
const StudentModel = mongoose.model("Students",StudentSchema)
module.exports = StudentModel;