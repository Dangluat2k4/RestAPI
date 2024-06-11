var db = require('./db');
// định nghĩa khuôn mẫu


const spSchema = new db.mongoose.Schema(
   {
    Date:{type:String, required: true},
    Email:{type: String,required: true}
   },
   {
       collection:'Bill' // tên bảng
   }
);
// tạo model
let billModel = db.mongoose.model('billModel', spSchema);
// có thể làm tương tự với các bảng khác, VD bảng thể loại...
module.exports = {billModel}
