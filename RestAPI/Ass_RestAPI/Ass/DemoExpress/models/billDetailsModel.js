var db = require('./db');
// định nghĩa khuôn mẫu


const spSchema = new db.mongoose.Schema(
   {
    BillID:{type:String, required: true},
    ProductID:{type: String,required: true},
    Quantity:{type:Number, required:true}
   },
   {
       collection:'BillDetails' // tên bảng
   }
);


// tạo model
let billDetailModel = db.mongoose.model('billDetailModel', spSchema);
// có thể làm tương tự với các bảng khác, VD bảng thể loại...
module.exports = {billDetailModel}
