const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    Name:{
        type:String,
    //Required lgany se ye hoga k agr string nahi ayi to API p hit hi nahi krega
        required:true,
    },
    Duration:{
        type: Number,
        required:true
    }
    ,Fees:{
        type: Number,
        required:true
    },
    ShortName:{
        type: String,
        required:true
    }
});
//Name pass krna hai , Schema
const CourseModel = mongoose.model('Course',CourseSchema)

module.exports = CourseModel;