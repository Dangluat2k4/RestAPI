var db = require('./db');
// định nghĩa khuôn mẫu

const spSchema = new db.mongoose.Schema(
    {
        name:{type:String, required: true}, 
        price:{type: Number,required: true},
        image:{type:String, required: false}, 
    },
    {
        collection:'san_pham' // tên bảng
    }
);
// tạo model 
let spModel = db.mongoose.model('spModel', spSchema);
// có thể làm tương tự với các bảng khác, VD bảng thể loại...
module.exports = {spModel}


