var myMD = require('../models/acModel')
var fs = require('fs'); // thư viện xử lý về file


exports.DanhSach = async (req, res, next) => {
    // cải tiến thêm điều kiện lọc
    let dk = null;
    if (typeof (req.query.Price) != 'undefined') {
        dk = { Price: req.query.Price } // lọc chính xác
 
 
        //lấy các sp giá lớn hơn hoặc bằng giá đã nhập
        // dk = { price: {$gte: req.query.price}}
    }
    let list = await myMD.acModel.find(dk).sort({ ProductName: 1 });
 
 
    res.status(200).json(list)
 
 }

 exports.getAccount = async(req,res,next)=>{
    try{
        let id = req.params.id;
        let result = await myMD.acModel.findById(id);
        res.json({result: result});
    }catch(error){
        res.json({status:"lay that bai", result : error});
    }
};



 
 exports.add = async (req, res, next) => {
    try {
        // console.log(req.body);
        let obj = new myMD.acModel({
            PassWord: req.body.PassWord,
            FullName: req.body.FullName,
            Avatar: req.body.Avatar,

        });
        let result = await obj.save()
        res.json({ status: "Add thành công", result: result })
    } catch (error) {
        res.json({ status: "Add  lỗi", result: error })
    }
  
}

exports.login = async (req, res, next)=>{
        try {
            const { FullName, PassWord } = req.body;
            let result = await myMD.acModel.findOne({ FullName: FullName, PassWord: PassWord });
            if (result) {
                res.json({ status: "success", result: result });
            } else {
                res.json({ status: "error", message: "Invalid FullName or PassWord" });
            }
        } catch (error) {
            res.json({ status: "error", message: error.message });
        }
    };
    


 
exports.update = async (req, res, next) => {
    try {
      let id = req.params.id;
      let obj = {};
      obj.PassWord = req.body.PassWord;
      obj.FullName = req.body.FullName;

      let result = await myMD.acModel.findByIdAndUpdate(id, obj, { new: true });
      res.json({ status: "update thanh cong", result: result });
    } catch (error) {
      res.json({ status: "update khong thanh cong", result: error });   
    }
  };
  

exports.delete = async(req,res,next)=>{
        try{
            let id = req.params.id;
            let result = await myMD.acModel.findByIdAndDelete(id);
            res.json({status:"delete thanh cong", result: result});
        }catch(error){
            res.json({status:"delete khong thanh cong", result : error});
        }
};

