var db = require('./db');
// định nghĩa khuôn mẫu

const spSchema = new db.mongoose.Schema(
    {
        Password:{type:String, required: true},
        Fullname: {type: String, required: true}
    },
    {
        collection:'Account' // tên bảng
    }
);
// tạo model
let spModel = db.mongoose.model('spModel', spSchema);
// có thể làm tương tự với các bảng khác
module.exports = {spModel}