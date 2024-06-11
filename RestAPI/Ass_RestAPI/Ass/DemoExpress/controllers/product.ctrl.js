var myMD = require('../models/spModel')
exports.DanhSach = async (req, res, next)=>{
    // cải tiến thêm điều kiện lọc
    let dk = null;
    if(typeof(req.query.price) != 'undefined')
    {
        dk = { price: {$gte: req.query.price}}
        //lấy các sp giá lớn hơn hoặc bằng giá đã nhập
    }
    let list = await myMD.spModel.find(dk).sort({Price:1});
 
 
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
    res.render('product/chi-tiet', {objSP: objSP, msg:msg});
 }


 exports.Them = async (req, res, next) => {
    let msg = '';
    try {
        if (req.method == 'POST') {
            //1. Lấy dữ liệu từ form gửi lên
            let { ProductName, Price,Description } = req.body;
 
 
            // có thể kiểm tra hợp liệu ở đây hoặc sau này cho vào middleware cài ở router
            //vd kiểm tra:
            if(ProductName.length <3)
            {
                msg = 'Cần nhập tên SP ít nhất 3 ký tự';
                return res.render('product/them', {msg: msg}); // chú ý: phải có chữ return
                // các trường dữ liệu khác làm tương tự
            }
            
            if(Price.length<0){
                msg = 'Cần nhập vào giá';
                return res.render({msg: msg});
            }
            else if(isNaN(Price)){
                msg = 'giá cần nhập phải là số';
                return res.render('product/them',{msg:msg});
            }else if(Price <0){
                msg = 'giá nhập vào phải lớn hơn 0';
                return res.render('product/them',{msg:msg});
            }
            
            if(Description.length<0){
                msg = "cần nhập vào description";
                return res.render('product/them',{msg:msg})
            }


            // Tạo đối tượng để ghi vào CSDL
            let objSP = new myMD.spModel();
            objSP.ProductName = ProductName;
            objSP.Price = Price;
            objSP.Description = Description;
            // Ghi vào CSDL
            let kq = await objSP.save();
            msg = 'Thêm thành công, id mới = '+ kq._id;
            return res.redirect('/products');
        }
 
 
    } catch (err) {
        msg = err.message;
    }
 
 
    res.render('product/them', {msg: msg});
 }
 


 exports.Sua = async (req, res, next) => {
    let msg = '';
    let objSP = null;
 
    try {
        // lấy thông tin sản phẩm: Copy ở chức năng xem chi tiết
        let id = req.params.id;
        objSP = await myMD.spModel.findOne({ _id: id });
        msg = 'Lấy dữ liệu thành công';

        //kiểm tra sự kiện post ở đây
        if (req.method == 'POST') {
            //1. Lấy dữ liệu từ form gửi lên
            let { ProductName, Price, Description } = req.body;

            // có thể kiểm tra hợp liệu ở đây hoặc sau này cho vào middleware cài ở router
            //vd kiểm tra:
            if (ProductName.length < 3) {
                msg = 'Cần nhập tên SP ít nhất 3 ký tự';
                return res.render('product/sua', { msg: msg, objSP: objSP });
                // chú ý: phải có chữ return
                // các trường dữ liệu khác làm tương tự
            }
            if(Price.length<0){
                msg = 'Cần nhập vào giá';
                return res.render({msg: msg, objSP: objSP});
            }
            else if(isNaN(Price)){
                msg = 'giá cần nhập phải là số';
                return res.render('product/sua',{msg:msg,objSP: objSP});
            }else if(Price <0){
                msg = 'giá nhập vào phải lớn hơn 0';
                return res.render('product/sua',{msg:msg,objSP: objSP});
            }
            
            if(Description.length<1){
                msg = "cần nhập vào description";
                return res.render('product/sua',{msg:msg,objSP: objSP})
            }

            // Tạo đối tượng để ghi vào CSDL
            let objSP_new = {}; // tạo đối tượng thường, không phải model
            objSP_new.ProductName = ProductName;
            objSP_new.Price = Price;
            objSP_new.Description = Description;
            // Ghi vào CSDL
            await myMD.spModel.findByIdAndUpdate(req.params.id, objSP_new);
            
            // Chuyển hướng trang sau khi cập nhật thành công
            return res.redirect('/products');
        }
    } catch (err) {
        msg = err.message;
    }

    res.render('product/sua', { msg: msg, objSP: objSP });
}

 


 
exports.Xoa = async (req, res, next) => {
    try {
        // Lấy id của sản phẩm cần xóa từ URL
        const productId = req.params.id;

        // Thực hiện xóa sản phẩm từ CSDL
        await myMD.spModel.findByIdAndDelete(productId);

        // Gửi thông báo thành công về phía người dùng
        res.send('Xóa sản phẩm thành công!');
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Lỗi khi xóa sản phẩm:', error);
        res.status(500).send('Đã xảy ra lỗi khi xóa sản phẩm.');
    }

    res.render('product/xoa',);
};