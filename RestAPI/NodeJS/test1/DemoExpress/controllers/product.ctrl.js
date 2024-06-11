var myMD = require('../models/spModel')

var fs = require('fs'); // thu vien su ly ve file
exports.DanhSach = async (req, res, next) => {

    // cai thieu them dieu kien loc
    /* let dk = null;
      if(typeof(req.query.price) != 'undefined')
      dk = {price:{$gte:req.query.price}}
  */
    // lay san pham lon hon hoac bang gia



    let list = await myMD.spModel.find().sort({ ProductName: 1 });

    res.render('product/danh-sach', { listSP: list });
    /*    //res.send("<h1>Danh sách sản phẩm</h1>");
    let tieu_de = 'tieu de trong controller';
    res.render('product/danh-sach',{tieuDe:tieu_de});
    */
}
exports.XemChiTiet = async (req, res, next) => {
    let objSP = null;
    let msg = '';
    try {
        let id = req.params.id;
        objSP = await myMD.spModel.findOne({ _id: id });

        // xuong den dong nay la khong co loi
        msg = 'lay du lieu thanh cong !!!!'

    } catch (error) {
        msg = error.message;
    }
    res.render('product/chi-tiet', { objSP: objSP, msg: msg });
}


exports.Them = async (req, res, next) => {
    let msg = '';
    try {
        if (req.method == 'POST') {
            // lay du lieu tu form gui 
            let { ProductName, Price } = req.body;
            console.log(ProductName);
            // co the kiem tra hop le du lieu hoac sau nay cho vao middleware cai o router
            // vi du kiem tra
            if (ProductName.length < 3) {
                msg = 'Cần nhập tên SP ít nhất 3 ký tự';
                return res.render('product/them', { msg: msg }); // chú ý: phải có chữ return
                // các trường dữ liệu khác làm tương tự
            }

            // tao doi tuong de ghi vao csdl
            let objSP = new myMD.spModel();
            objSP.ProductName = ProductName;
            objSP.Price = Price;




            // truoc khi ghi vao csld se su ly upload file o day
            // trước khi ghi vào CSDL sẽ xử lý upload file ở đây


            // trước khi ghi vào CSDL sẽ xử lý upload file ở đây
            if(fs.existsSync(req.file.path)){
                let file_path = './public/uploads/' + req.file.originalname;
 
 
                // có tồn tại file
                // có thể kiểm tra định dạng file ....
                console.log(req.file);
                // { kết quả log có các thuộc tính, bạn muốn kiểm tra gì thì req.file.xxxxx
                //     fieldname: 'anh',
                //     originalname: 'giao-dien-mua-hang.png',
                //     encoding: '7bit',
                //     mimetype: 'image/png',
                //     destination: './tmp',
                //     filename: '280990afd14931ba2d750ff76630544e',
                //     path: 'tmp/280990afd14931ba2d750ff76630544e',
                //     size: 676236
                //   }
                if(req.file.mimetype.indexOf('image') ==-1){
                    // định dạng file chuẩn ảnh
                    msg = 'Không đúng định dạng ảnh';
                    return res.render('product/them', {msg: msg});// thoát khỏi hàm
                    // không ghi vào CSDL
                }
                // đến đây là phù hợp điều kiện
                fs.renameSync(req.file.path, file_path);
 
 
                // không có lỗi thì sẽ chạy xuống lệnh dưới đây
                objSP.image = '/uploads/' + req.file.originalname;
 
 
             }
 


            // ghi vao csdl
            let kq = await objSP.save();
            msg = 'Them thanh cong, id moi  :' + kq._id;
        }
    } catch (err) {
        msg = err.message;
    }
    res.render('product/them', { msg: msg });

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
            let { ProductName, Price } = req.body;
            // có thể kiểm tra hợp liệu ở đây hoặc sau này cho vào middleware cài ở router
            //vd kiểm tra:
            if (ProductName.length < 3) {
                msg = 'Cần nhập tên SP ít nhất 3 ký tự';
                return res.render('product/sua', { msg: msg, objSP: objSP });
                // chú ý: phải có chữ return
                // các trường dữ liệu khác làm tương tự
            }

            // Tạo đối tượng để ghi vào CSDL
            let objSP_new = {}; // tạo đối tượng thường, không phải model
            objSP_new.ProductName = ProductName;
            objSP_new.Price = Price;
            // Ghi vào CSDL
            await myMD.spModel.findByIdAndUpdate(req.params.id, objSP_new);
            msg = 'Cập nhật thành công. ';
        }



    } catch (err) {
        msg = err.message;
    }


    res.render('product/sua', { msg: msg, objSP: objSP });
}

// Thêm route để xử lý yêu cầu xóa
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
