var myAC = require('../models/acModel')
exports.ListAccount = async (req, res, next)=>{
  
   let list = await myAC.acModel.find().sort({FullName:1});
   res.render('account/list-account', { listAC : list  });
}

exports.SeeDetail = async (req, res, next)=>{
    let objSP= null;
    let msg = '';
    try {
        let id = req.params.id;
 
 
        objSP = await myAC.acModel.findOne({_id: id});
 
 
        // xuống đến dòng này là không có lỗi
        msg = 'Lấy dữ liệu thành công';
 
 
    } catch (error) {
        msg = error.message;
    }
    res.render('account/see-detail', {objSP: objSP, msg:msg});
 }


 exports.AddAccount = async (req, res, next) => {
    let msg = '';
    try {
        if (req.method == 'POST') {
 
 
            //1. Lấy dữ liệu từ form gửi lên
            let { PassWord, FullName } = req.body;
 
 
            // có thể kiểm tra hợp liệu ở đây hoặc sau này cho vào middleware cài ở router
            //vd kiểm tra:
            if(PassWord.length <3)
            {
                msg = 'Cần nhập tên password ít nhất 3 ký tự';
                return res.render('account/addAccount', {msg: msg}); // chú ý: phải có chữ return
                // các trường dữ liệu khác làm tương tự
            }
            if(FullName.length<3){
                msg = 'Cần nhập tên ít nhất 3 ký tự';
                return res.render('account/addAccount', {msg: msg});
            }
            // Tạo đối tượng để ghi vào CSDL
            let objSP = new myAC.acModel();
            objSP.PassWord = PassWord;
            objSP.FullName = FullName;
            // Ghi vào CSDL
            let kq = await objSP.save();
            msg = 'Thêm thành công, id mới = '+ kq._id;
            return res.redirect('/account');
        }
 
 
    } catch (err) {
        msg = err.message;
    }
 
    res.render('account/addAccount', {msg: msg});
 }

 exports.Update = async (req, res, next) => {
    let msg = '';
    let objSP = null;
 
 
    try {
        // lấy thông tin sản phẩm: Copy ở chức năng xem chi tiết
        let id = req.params.id;
        objSP = await myAC.acModel.findOne({ _id: id });
        msg = 'Lấy dữ liệu thành công ';

        //kiểm tra sự kiện post ở đây
       if (req.method == 'POST') {


        //1. Lấy dữ liệu từ form gửi lên
        let { PassWord, FullName} = req.body;


        // có thể kiểm tra hợp liệu ở đây hoặc sau này cho vào middleware cài ở router
        //vd kiểm tra:
        if(PassWord.length <3)
        {
            msg = 'Cần nhập password ít nhất 3 ký tự';
            return res.render('account/updateAccount', {msg: msg, objSP:objSP});
             // chú ý: phải có chữ return
            // các trường dữ liệu khác làm tương tự
        }
        if(FullName.length<3){
            msg = 'Cần nhập tên ít nhất 3 ký tự';
            return res.render('account/updateAccount', {msg: msg, objSP:objSP});
        }
        
        // Tạo đối tượng để ghi vào CSDL
        let objSP_new = {}; // tạo đối tượng thường, không phải model
        objSP_new.PassWord = PassWord;
        objSP_new.FullName = FullName;
        // Ghi vào CSDL
        await myAC.acModel.findByIdAndUpdate(req.params.id, objSP_new);
        msg = 'Cập nhật thành công. ';
        return res.redirect('/account');
    }

    } catch (err) {
        msg = err.message;
    }
 
 
    res.render('account/updateAccount', {msg: msg, objSP:objSP});
 }

  
exports.Delete = async (req, res, next) => {
    try {
        // Lấy id của sản phẩm cần xóa từ URL
        const productId = req.params.id;

        // Thực hiện xóa sản phẩm từ CSDL
        await myAC.acModel.findByIdAndDelete(productId);

        // Gửi thông báo thành công về phía người dùng
        res.send('Xóa sản phẩm thành công!');
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Lỗi khi xóa sản phẩm:', error);
        res.status(500).send('Đã xảy ra lỗi khi xóa sản phẩm.');
    }

    res.render('account/deleteAccount',);
};