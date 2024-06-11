var db = require('./db');
// định nghĩa khuôn mẫu


const ttSchema = new db.mongoose.Schema(
   {
    thongKe:{type:Number, required: true}
   },
   {
       collection:'thongKe' // tên bảng
   }
);

// tạo model
let ttModel = db.mongoose.model('ttModel', ttSchema);
// có thể làm tương tự với các bảng khác, VD bảng thể loại...
module.exports = {ttModel}