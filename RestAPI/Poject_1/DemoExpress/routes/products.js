var express = require('express');
var router = express.Router();
var productCtrl = require('../controllers/product.ctrl');
// Code here

// Trang danh sách sản phẩm:   http://localhost:3000/products
// Trang xem chi tiết sản phẩm:  http://localhost:3000/products/view/123456    (với id là 123446)
// Trang vào giao diện thêm mới: http://localhost:3000/products/add 
// Trang vào giao diện thêm mới: http://localhost:3000/products/edit 

router.get('/',productCtrl.DanhSach)

// http://localhost:3000/products/view/123456 
router.get('/view/:id',productCtrl.XemChiTiet)

// http://localhost:3000/products/add 
router.get('/add', (req, res, next) => {
    res.send("<h1>Thêm mới sản phẩm</h1>");
})

// http://localhost:3000/products/edit/333 
router.get('/edit/:id', (req, res, next) => {
    res.send("<h1>Sửa sản phẩm</h1>");
})

// http://localhost:3000/products/delete/123456
router.get('/delete/:id', (req, res, next) => {
    res.send("<h1>Xóa sản phẩm</h1>");
});

// chú ý: không được thiếu export
module.exports = router;
