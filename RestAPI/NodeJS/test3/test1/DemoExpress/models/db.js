const mongoose = require('mongoose');
mongoose.connect( 'mongodb://localhost:27017/test')
       .catch( (err) =>{
               console.log("Loi ket noi CSDL");
               console.log(err);
       });
      
module.exports = {mongoose}
