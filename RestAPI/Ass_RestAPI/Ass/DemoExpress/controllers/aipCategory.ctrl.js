var myMD = require('../models/categoryModel')
var fs = require('fs'); // thư viện xử lý về file


exports.DanhSach = async (req, res, next) => {
    // cải tiến thêm điều kiện lọc
    let dk = null;
    if (typeof (req.query.CateName) != 'undefined') {
        dk = { Price: req.query.CateName } // lọc chính xác
 
 
        //lấy các sp giá lớn hơn hoặc bằng giá đã nhập
        // dk = { price: {$gte: req.query.price}}
    }
    let list = await myMD.categoryModel.find(dk).sort({ CateName: 1 });
 
 
    res.status(200).json(list)
 
 }

 exports.add = async (req, res, next) => {
    try {
        // console.log(req.body);
        let obj = new myMD.categoryModel({
            
            CateName: req.body.CateName

        });
        let result = await obj.save()
        res.json({ status: "Add thành công", result: result })
    } catch (error) {
        res.json({ status: "Add  lỗi", result: error })
    }
  
}

exports.update = async (req, res, next) => {
    try {
      let id = req.params.id;
      let obj = {};
      obj.CateName = req.body.CateName;
      let result = await myMD.categoryModel.findByIdAndUpdate(id, obj, { new: true });
      res.json({ status: "update thanh cong", result: result });
    } catch (error) {
      res.json({ status: "update khong thanh cong", result: error });   
    }
  };
  

exports.delete = async(req,res,next)=>{
        try{
            let id = req.params.id;
            let result = await myMD.categoryModel.findByIdAndDelete(id);
            res.json({status:"delete thanh cong", result: result});
        }catch(error){
            res.json({status:"delete khong thanh cong", result : error});
        }
};
