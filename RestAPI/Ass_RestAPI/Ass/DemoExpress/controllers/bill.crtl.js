var myMD = require('../models/billModel')
exports.ListBill = async (req, res, next)=>{
    // cải tiến thêm điều kiện lọc
    let list = await myMD.billModel.find().sort({Date:1});
 
 
    res.render('bill/list-bill', { listBill : list  });
 }
 exports.BillDetail = async (req, res, next)=>{
    let objSP= null;
    let msg = '';
    try {
        let id = req.params.id;
 
 
        objSP = await myMD.billModel.findOne({_id: id});
 
 
        // xuống đến dòng này là không có lỗi
        msg = 'Lấy dữ liệu thành công';
 
 
    } catch (error) {
        msg = error.message;
    }
    res.render('bill/see-detail-bill', {objSP: objSP, msg:msg});
 }

 exports.AddBill = async (req, res, next) => {
    let msg = '';
    try {
        if (req.method == 'POST') {
 
 
            //1. Lấy dữ liệu từ form gửi lên
            let { Date, Email } = req.body;
 
            const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            // có thể kiểm tra hợp liệu ở đây hoặc sau này cho vào middleware cài ở router
            //vd kiểm tra:
            if(Date.length <1)
            {
                msg = 'Cần nhập vao Date';
                return res.render('bill/add-bill', {msg: msg}); // chú ý: phải có chữ return
                // các trường dữ liệu khác làm tương tự
            } 
             if(!dateRegex.test(Date)){
                msg = 'date nhập vào không đúng định dạng';
                return res.render('bill/add-bill', {msg: msg}); // chú ý: phải có chữ return
            }

            if(Email.length <1)
            {
                msg = 'Cần nhập vào email';
                return res.render('bill/add-bill', {msg: msg}); // chú ý: phải có chữ return
                // các trường dữ liệu khác làm tương tự
            } 
            if(!emailRegex.test(Email)){
                msg = 'Email nhập vào không đúng định dạng';
                return res.render('bill/add-bill', {msg: msg}); // chú ý: phải có chữ return
            }
            // Tạo đối tượng để ghi vào CSDL
            let objSP = new myMD.billModel();
            objSP.Date = Date;
            objSP.Email = Email;
            // Ghi vào CSDL
            let kq = await objSP.save();
            msg = 'Thêm thành công, id mới = '+ kq._id;
            return res.redirect('/bill');
        }
 
 
    } catch (err) {
        msg = err.message;
    }
 
    res.render('bill/add-bill', {msg: msg});
 }

 exports.Update = async (req, res, next) => {
    let msg = '';
    let objSP = null;
 
 
    try {
        // lấy thông tin sản phẩm: Copy ở chức năng xem chi tiết
        let id = req.params.id;
        objSP = await myMD.billModel.findOne({ _id: id });
        msg = 'Lấy dữ liệu thành công d3r3weded';

        //kiểm tra sự kiện post ở đây
       if (req.method == 'POST') {


        //1. Lấy dữ liệu từ form gửi lên
        let { Date, Email} = req.body;


        // có thể kiểm tra hợp liệu ở đây hoặc sau này cho vào middleware cài ở router

        
        const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // có thể kiểm tra hợp liệu ở đây hoặc sau này cho vào middleware cài ở router
        //vd kiểm tra:
        if(Date.length <1)
        {
            msg = 'Cần nhập vao Date';
            return res.render('bill/update-bill', {msg: msg, objSP:objSP});// chú ý: phải có chữ return
            // các trường dữ liệu khác làm tương tự
        } 
         if(!dateRegex.test(Date)){
            msg = 'date nhập vào không đúng định dạng';
            return res.render('bill/update-bill', {msg: msg, objSP:objSP}); // chú ý: phải có chữ return
        }

        if(Email.length <1)
        {
            msg = 'Cần nhập vào email';
            return res.render('bill/update-bill', {msg: msg, objSP:objSP}); // chú ý: phải có chữ return
            // các trường dữ liệu khác làm tương tự
        } 
        if(!emailRegex.test(Email)){
            msg = 'Email nhập vào không đúng định dạng';
            return res.render('bill/update-bill', {msg: msg, objSP:objSP});// chú ý: phải có chữ return
        }
        // Tạo đối tượng để ghi vào CSDL
        let objSP_new = {}; // tạo đối tượng thường, không phải model
        objSP_new.Date = Date;
        objSP_new.Email = Email;
        // Ghi vào CSDL
        await myMD.billModel.findByIdAndUpdate(req.params.id, objSP_new);
        msg = 'Cập nhật thành công. ';
        return res.redirect('/bill');
    }

    } catch (err) {
        msg = err.message;
    }
 
 
    res.render('bill/update-bill', {msg: msg, objSP:objSP});
 }

 exports.Delete = async (req, res, next) => {
    try {
        // Lấy id của sản phẩm cần xóa từ URL
        const productId = req.params.id;

        // Thực hiện xóa sản phẩm từ CSDL
        await myMD.billModel.findByIdAndDelete(productId);

        // Gửi thông báo thành công về phía người dùng
        res.send('Xóa sản phẩm thành công!');
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Lỗi khi xóa sản phẩm:', error);
        res.status(500).send('Đã xảy ra lỗi khi xóa sản phẩm.');
    }

    res.render('bill/delete-bill',);
};