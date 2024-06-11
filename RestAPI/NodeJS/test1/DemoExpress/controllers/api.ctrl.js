var myMD = require('../models/spModel')

var fs = require('fs'); // thu vien su ly ve file

var {userModel} = require('../models/user.models');
const bcrypt = require("bcrypt");

exports.dologin = async (req, res, next)=>{
    try {
 
 
        const user = await userModel
                    .findByCredentials(req.body.username, req.body.passwd)
        if (!user) {
            return res.status(401)
                    .json({error: 'Sai thông tin đăng nhập'})
        }
        // đăng nhập thành công, tạo token làm việc mới
        const token = await user.generateAuthToken()
 
 
        return res.status(200).send({ user, token })
 
 
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }
    
  }
 
 
 
  exports.doReg = async (req, res, next)=>{


    try {
        const salt = await bcrypt.genSalt(10);
 
 
        const user = new userModel(req.body);
 
 
        user.passwd = await bcrypt.hash(req.body.passwd, salt);
        const token = await user.generateAuthToken();
 
 
        let new_u = await user.save()
 
 
        return res.status(201).send({ user: new_u, token })
 
 
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }
 
 
    res.json( {status: 1, msg: 'Trang đăng ký'});
 }
 
 




exports.DanhSach = async (req, res, next) => {
   // cải tiến thêm điều kiện lọc
   let dk = null;
   if (typeof (req.query.Price) != 'undefined') {
       dk = { Price: req.query.Price } // lọc chính xác


       //lấy các sp giá lớn hơn hoặc bằng giá đã nhập
       // dk = { price: {$gte: req.query.price}}
   }
   let list = await myMD.spModel.find(dk).sort({ ProductName: 1 });


   res.status(200).json({
       list
   })

}
exports.XemChiTiet = async (req, res, next) => {


}

exports.Sua = async (req, res, next) => {

}

// Thêm route để xử lý yêu cầu xóa
exports.Xoa = async (req, res, next) => {
};
