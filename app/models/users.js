const mongoose = require('mongoose');

// define our students model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', {
   userName : {type : String, default: ''},
   id : {type : Number},
   followers : {type : Number},
   pledged : {type : Boolean},
   profileImageUrl : {type : String},
   signUpDate: { type: Date, default: Date.now },
   verified: {type: Boolean}
});