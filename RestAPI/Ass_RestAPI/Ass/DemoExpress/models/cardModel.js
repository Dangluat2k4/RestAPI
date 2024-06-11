    var db = require('./db');
    // định nghĩa khuôn mẫu


    const cartSchema = new db.mongoose.Schema(
    {
        ProductID:{type:String, required: true},
        Name:{type: String,required: true},
        Price:{type: Number,required: true},
        Description:{type: String,required: true},
        Quantity:{type: Number,required: false},
        IDAccount: {type: String,required: false},
        Image:{type:String, required:false},
        
    },
    {
        collection:'Cart' // tên bảng
    }
    );
    // tạo model
    let cartModel = db.mongoose.model('cartModel', cartSchema);
    // có thể làm tương tự với các bảng khác, VD bảng thể loại...
    module.exports = {cartModel}