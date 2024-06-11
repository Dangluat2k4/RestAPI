var myMD = require('../models/spModel')
exports.login = async (req, res, next) => {
   // cải tiến thêm điều kiện lọc
   let dk = null;
   if(typeof(req.query.Price) != 'undefined')
   {
       dk = { price: {$gte: req.query.Price}}
       //lấy các sp giá lớn hơn hoặc bằng giá đã nhập
   }
   let list = await myMD.spModel.find(dk).sort({Price:1});


   res.render('product/login', { listSP : list  });
}
exports.trangChu = (req, res, next) => {
    res.render('product/trangchu')
}
exports.tinTuc = (req, res, next) => {
    res.render('product/tintuc')
}
exports.sanPham = (req, res, next) => {
    res.render('product/sanPham')
}
exports.lienHe = (req, res, next) => {
    res.render('product/lienHe')
}