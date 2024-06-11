var myMD = require('../models/billDetailsModel')
exports.ListBillDetail = async (req, res, next) => {
    // cải tiến thêm điều kiện lọc
    let list = await myMD.billDetailModel.find().sort({ Date: 1 });


    res.render('billDetail/list-billDetail', { listBill: list });
}

exports.SeeBillDetail = async (req, res, next) => {
    let objSP = null;
    let msg = '';
    try {
        let id = req.params.id;


        objSP = await myMD.billDetailModel.findOne({ _id: id });


        // xuống đến dòng này là không có lỗi
        msg = 'Lấy dữ liệu thành công !!!!';


    } catch (error) {
        msg = error.message;
    }
    res.render('billDetail/see-detail-bill', { objSP: objSP, msg: msg });
}

exports.AddBillDetail = async (req, res, next) => {
    let msg = '';
    try {
        if (req.method == 'POST') {


            //1. Lấy dữ liệu từ form gửi lên
            let { BillID, ProductID, Quantity } = req.body;


            // có thể kiểm tra hợp liệu ở đây hoặc sau này cho vào middleware cài ở router
            //vd kiểm tra:
            if (BillID.length < 3) {
                msg = 'Cần nhập BillID ít nhất 3 ký tự';
                return res.render('billDetail/add-billDetail', { msg: msg }); // chú ý: phải có chữ return
                // các trường dữ liệu khác làm tương tự
            }
            if (ProductID.length < 3) {
                msg = 'Cần nhập Product ít nhất 3 ký tự';
                return res.render('billDetail/add-billDetail', { msg: msg }); // chú ý: phải có chữ return
                // các trường dữ liệu khác làm tương tự
            }
            else if (Quantity.length < 0) {
                msg = 'bạn cần nhập vào số lượng';
                return res.render('billDetail/add-billDetail', { msg: msg });
            }
            if (isNaN(Quantity)) {
                msg = 'số lương nhập vào cần là số';
                return res.render('billDetail/add-billDetail', { msg: msg });
            } else if (Quantity < 0) {
                msg = 'só lượng nhập vào cần là số';
                return res.render('billDetail/add-billDetail', { msg: msg });
            }

            // Tạo đối tượng để ghi vào CSDL
            let objSP = new myMD.billDetailModel();
            objSP.BillID = BillID;
            objSP.ProductID = ProductID;
            objSP.Quantity = Quantity;
            // Ghi vào CSDL
            let kq = await objSP.save();
            msg = 'Thêm thành công, id mới = ' + kq._id;
            return res.redirect('/billDetail');
        }


    } catch (err) {
        msg = err.message;
    }

    res.render('billDetail/add-billDetail', { msg: msg });
}

exports.Update = async (req, res, next) => {
    let msg = '';
    let objSP = null;


    try {
        // lấy thông tin sản phẩm: Copy ở chức năng xem chi tiết
        let id = req.params.id;
        objSP = await myMD.billDetailModel.findOne({ _id: id });
        msg = 'Lấy dữ liệu thành công';

        //kiểm tra sự kiện post ở đây
        if (req.method == 'POST') {


            //1. Lấy dữ liệu từ form gửi lên
            let { BillID, ProductID, Quantity } = req.body;


            // có thể kiểm tra hợp liệu ở đây hoặc sau này cho vào middleware cài ở router
            //vd kiểm tra:
            if (BillID.length < 3) {
                msg = 'Cần nhập tên SP ít nhất 3 ký tự';
                return res.render('billDetail/update-billDetail', { msg: msg, objSP: objSP });
                // chú ý: phải có chữ return
                // các trường dữ liệu khác làm tương tự
            }
            if (ProductID.length < 3) {
                msg = 'Cần nhập Product ít nhất 3 ký tự';
                return res.render('billDetail/update-billDetail', { msg: msg, objSP: objSP });// chú ý: phải có chữ return
                // các trường dữ liệu khác làm tương tự
            }
            else if (Quantity.length < 0) {
                msg = 'bạn cần nhập vào số lượng';
                return res.render('billDetail/update-billDetail', { msg: msg, objSP: objSP });
            }
            if (isNaN(Quantity)) {
                msg = 'số lương nhập vào cần là số';
                return res.render('billDetail/update-billDetail', { msg: msg, objSP: objSP });
            } else if (Quantity < 0) {
                msg = 'só lượng nhập vào cần là số';
                return res.render('billDetail/update-billDetail', { msg: msg, objSP: objSP });
            }

            // Tạo đối tượng để ghi vào CSDL
            let objSP_new = {}; // tạo đối tượng thường, không phải model
            objSP_new.BillID = BillID;
            objSP_new.ProductID = ProductID;
            objSP_new.Quantity = Quantity;
            // Ghi vào CSDL
            await myMD.billDetailModel.findByIdAndUpdate(req.params.id, objSP_new);
            msg = 'Cập nhật thành công. ';
            return res.redirect('/billDetail');
        }

    } catch (err) {
        msg = err.message;
    }


    res.render('billDetail/update-billDetail', { msg: msg, objSP: objSP });
}

exports.Delete = async (req, res, next) => {
    try {
        // Lấy id của sản phẩm cần xóa từ URL
        const productId = req.params.id;

        // Thực hiện xóa sản phẩm từ CSDL
        await myMD.billDetailModel.findByIdAndDelete(productId);

        // Gửi thông báo thành công về phía người dùng
        res.send('Xóa sản phẩm thành công!');
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Lỗi khi xóa sản phẩm:', error);
        res.status(500).send('Đã xảy ra lỗi khi xóa sản phẩm.');
    }

    res.render('billDetail/delete-billDetail',);
}