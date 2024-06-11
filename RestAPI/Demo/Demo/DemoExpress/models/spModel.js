var db = require('./db');
// định nghĩa khuôn mẫu


const spSchema = new db.mongoose.Schema(
   {
    PassWord:{type:String, required: true},
    FullName:{type: String,required: true}
   },
   {
       collection:'Account' // tên bảng
   }
);
// tạo model
let spModel = db.mongoose.model('spModel', spSchema);
// có thể làm tương tự với các bảng khác, VD bảng thể loại...
module.exports = {spModel}
