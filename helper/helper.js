const ResponseOBj = {
    status:null,
    data:null,
    message:"",
    error:"",
}

const sendResponse= (status,data,message,error)=>{
    ResponseOBj.status = status;
    ResponseOBj.data = data;
    ResponseOBj.error = error;
    ResponseOBj.message = message;
 return ResponseOBj
}

module.exports = sendResponse