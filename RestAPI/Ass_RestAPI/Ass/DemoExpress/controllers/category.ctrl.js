var myMD = require('../models/categoryModel')
exports.ListCategory = async (req, res, next)=>{
    // cải tiến thêm điều kiện lọc
    let list = await myMD.categoryModel.find().sort({Date:1});

    res.render('category/list-category', { List : list  });
 }
 
 exports.SeeCategory = async (req, res, next)=>{
    let objSP= null;
    let msg = '';
    try {
        let id = req.params.id;
 
 
        objSP = await myMD.categoryModel.findOne({_id: id});
 
 
        // xuống đến dòng này là không có lỗi
        msg = 'Lấy dữ liệu thành công !!!!';
 
 
    } catch (error) {
        msg = error.message;
    }
    res.render('category/see-category', {objSP: objSP, msg:msg});
 }


 exports.AddCategory = async (req, res, next) => {
    let msg = '';
    try {
        if (req.method == 'POST') {
 
 
            //1. Lấy dữ liệu từ form gửi lên
            let { CateName } = req.body;
 
 
            // có thể kiểm tra hợp liệu ở đây hoặc sau này cho vào middleware cài ở router
            //vd kiểm tra:
            if(CateName.length <3)
            {
                msg = 'Cần nhập CateName ít nhất 3 ký tự';
                return res.render('category/add-category', {msg: msg}); // chú ý: phải có chữ return
                // các trường dữ liệu khác làm tương tự
            }
            // Tạo đối tượng để ghi vào CSDL
            let objSP = new myMD.categoryModel();
            objSP.CateName = CateName;
            // Ghi vào CSDL
            let kq = await objSP.save();
            msg = 'Thêm thành công, id mới = '+ kq._id;
            return res.redirect('/category');
        }
 
 
    } catch (err) {
        msg = err.message;
    }
 
    res.render('category/add-category', {msg: msg});
 }

 
 exports.Update = async (req, res, next) => {
    let msg = '';
    let objSP = null;
 
 
    try {
        // lấy thông tin sản phẩm: Copy ở chức năng xem chi tiết
        let id = req.params.id;
        objSP = await myMD.categoryModel.findOne({ _id: id });
        msg = 'Lấy dữ liệu thành công hhh';

        //kiểm tra sự kiện post ở đây
       if (req.method == 'POST') {


        //1. Lấy dữ liệu từ form gửi lên
        let {CateName} = req.body;


        // có thể kiểm tra hợp liệu ở đây hoặc sau này cho vào middleware cài ở router
        //vd kiểm tra:
        if(CateName.length <3)
        {
            msg = 'Cần nhập CateName ít nhất 3 ký tự';
            return res.render('category/update-category', {msg: msg, objSP:objSP});
             // chú ý: phải có chữ return
            // các trường dữ liệu khác làm tương tự
        }
       
        // Tạo đối tượng để ghi vào CSDL
        let objSP_new = {}; // tạo đối tượng thường, không phải model
        objSP_new.CateName = CateName;
        // Ghi vào CSDL
        await myMD.categoryModel.findByIdAndUpdate(req.params.id, objSP_new);
        msg = 'Cập nhật thành công. ';
        return res.redirect('/category');
    }

    } catch (err) {
        msg = err.message;
    }
 
 
    res.render('category/update-category', {msg: msg, objSP:objSP});
 }

 
 exports.Delete = async (req, res, next) => {
    try {
        // Lấy id của sản phẩm cần xóa từ URL
        const productId = req.params.id;

        // Thực hiện xóa sản phẩm từ CSDL
        await myMD.categoryModel.findByIdAndDelete(productId);

        // Gửi thông báo thành công về phía người dùng
        res.send('Xóa sản phẩm thành công!');
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Lỗi khi xóa sản phẩm:', error);
        res.status(500).send('Đã xảy ra lỗi khi xóa sản phẩm.');
    }

    res.render('category/delete-category',);
}
