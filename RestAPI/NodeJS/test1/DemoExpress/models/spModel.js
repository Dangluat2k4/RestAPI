var db = require('./db');
// dinh nghia khuon mau cho san pham

const spSchema  = new db.mongoose.Schema(
    {
        ProductName:{type:String,required: true},
        Price:{type:Number,required:true},
        image:{type:String,required: false},
    },
    {
        collection:'Product'
    }// ten bang

);
// tao model
let spModel = db.mongoose.model('spModel',spSchema);
// co the lam tuong tu voi cac ban khac

module.exports = {spModel}