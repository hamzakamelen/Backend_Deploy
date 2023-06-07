const mongoose = require('mongoose');

// const qualificationSchema = new mongoose.Schema({
//     degree:{
//         type:String,
//     required:true
//     },
//     year:{
//         type:Number
//     },
//     institute:{
//         type:String,
//         required:true
//     }
// })


const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required : true,
        // type: String | Number | Boolean | Array, ye ye hskta hai
        // unique:true, //Dusri aik jesi field Set krne nahi dega
        // default :"ABC"
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    // dateOfBirth:{
    //     type : Date,
    // },
    // registerationDate:{
    //     type: Date,
    //     default : Date.now() //ye By default function hai ye aj ki date lelega
    // },
    // hobbies:{
    //     type:[String],
    // },
    // lastQualification:{
    //     type: [qualificationSchema]
    // },
    // address:{
    //     type:{
    //         Street : String,
    //         HouseNo : String
    //     }
    // }
})
module.exports = mongoose.model('users',userSchema)