var myMD = require('../models/spModel')
exports.DanhSach = async (req, res, next) => {
    // cải tiến thêm điều kiện lọc
    let dk = null;
    if (typeof(req.query.price) != 'undefined') {
        dk = { price: { $gte: req.query.price } }
        // lấy các sản phẩm lớn hơn hoặc bằng giá đã nhập
    }

    let list = await myMD.spModel.find(dk).sort({ name: 1 });

    res.render('products/danh-sach', { listSP: list });
}

exports.XemChiTiet = (req, res, next) => {
    res.render('products/chi-tiet');
}