var myMD = require('../models/billModel')
var fs = require('fs'); // thư viện xử lý về file


exports.DanhSach = async (req, res, next) => {
    // cải tiến thêm điều kiện lọc
    let dk = null;
    if (typeof (req.query.Price) != 'undefined') {
        dk = { Price: req.query.Price } // lọc chính xác
 
 
        //lấy các sp giá lớn hơn hoặc bằng giá đã nhập
        // dk = { price: {$gte: req.query.price}}
    }
    let list = await myMD.billModel.find(dk).sort({ Date: 1 });
 
 
    res.status(200).json(list);
 
 }


 exports.add = async (req, res, next) => {
    try {
        // console.log(req.body);
        let obj = new myMD.billModel({
            Date: req.body.Date,
            Email: req.body.Email,

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
      obj.Date = req.body.Date;
      obj.Email = req.body.Email;

      let result = await myMD.billModel.findByIdAndUpdate(id, obj, { new: true });
      res.json({ status: "update thanh cong", result: result });
    } catch (error) {
      res.json({ status: "update khong thanh cong", result: error });   
    }
  };
  

exports.delete = async(req,res,next)=>{
        try{
            let id = req.params.id;
            let result = await myMD.billModel.findByIdAndDelete(id);
            res.json({status:"delete thanh cong", result: result});
        }catch(error){
            res.json({status:"delete khong thanh cong", result : error});
        }
};
exports.timKiem  = async (req, res,next)=>{
    try {
        let keyword = req.query.keyword;
        let danhSachTimKiem = await myMD.billModel.find({Date:{$regex:keyword, $options:"i"}});
        res.json(danhSachTimKiem);
    } catch (error) {
        res.json({status:"loi tim kiem", result:error});
    }
}