const mongoose = require("mongoose")

const InstituteSchema = new mongoose.Schema({
    InstituteName:{
        type:String,
        required:true
    },
    InstituteLocation:{
        type:String,
        required:true
    },
    ShortName:{
        type:String,
        required:true    
    },
    contact:{
        type:String,
        required:true
    }

})

const InstituteModel = mongoose.model("Institute",InstituteSchema)

module.exports = InstituteModel;