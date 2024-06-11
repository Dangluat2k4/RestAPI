var db = require('./db');
// định nghĩa khuôn mẫu


const spSchema = new db.mongoose.Schema(
   {
    ProductName:{type:String, required: true},
    Price:{type: Number,required: true},
    Description:{type:String, required:true},
    Image:{type:String, required:false},
    Status:{type:Number, required: true,default:0},
    //CateID:{type:String, required:false}
   },
   {
       collection:'Product' // tên bảng
   } 
);

// tạo model
let spModel = db.mongoose.model('spModel', spSchema);
// có thể làm tương tự với các bảng khác, VD bảng thể loại...
module.exports = {spModel}
