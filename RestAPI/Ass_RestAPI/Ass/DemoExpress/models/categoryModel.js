var db = require('./db');
// định nghĩa khuôn mẫu


const spSchema = new db.mongoose.Schema( 
   {
    CateName:{type:String, required: true},
   },
   {
       collection:'Category' // tên bảng
   }
);
// tạo model
let categoryModel = db.mongoose.model('categoryModel', spSchema);
// có thể làm tương tự với các bảng khác, VD bảng thể loại...
module.exports = {categoryModel}
