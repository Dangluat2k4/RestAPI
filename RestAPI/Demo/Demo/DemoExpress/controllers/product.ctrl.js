var myMD = require('../models/spModel')
exports.DanhSach = async (req, res, next)=>{
   // cải tiến thêm điều kiện lọc
   let dk = null;
   if(typeof(req.query.price) != 'undefined')
   {
       dk = { price: {$gte: req.query.price}}
       //lấy các sp giá lớn hơn hoặc bằng giá đã nhập
   }
   let list = await myMD.spModel.find(dk).sort({name:1});


   res.render('product/danh-sach', { listSP : list  });
}


exports.XemChiTiet = async (req, res, next)=>{
   let objSP= null;
   let msg = '';
   try {
       let id = req.params.id;


       objSP = await myMD.spModel.findOne({_id: id});


       // xuống đến dòng này là không có lỗi
       msg = 'Lấy dữ liệu thành công';


   } catch (error) {
       msg = error.message;
   }
   res.render('product/chitiet', {objSP: objSP, msg:msg});
}


exports.Them = async (req, res, next) => {
   let msg = '';
   try {
       if (req.method == 'POST') {


           //1. Lấy dữ liệu từ form gửi lên
           let { PassWord, FullName } = req.body;


           // có thể kiểm tra hợp liệu ở đây hoặc sau này cho vào middleware cài ở router
           //vd kiểm tra:
           if(PassWord.length <3)
           {
               msg = 'Cần nhập tên SP ít nhất 3 ký tự';
               return res.render('product/them', {msg: msg}); // chú ý: phải có chữ return
               // các trường dữ liệu khác làm tương tự
           }
           // Tạo đối tượng để ghi vào CSDL
           let objSP = new myMD.spModel();
           objSP.PassWord = PassWord;
           objSP.FullName = FullName;
           // Ghi vào CSDL
           let kq = await objSP.save();
           msg = 'Thêm thành công, id mới = '+ kq._id;
       }


   } catch (err) {
       msg = err.message;
   }


   res.render('product/them', {msg: msg});
}


