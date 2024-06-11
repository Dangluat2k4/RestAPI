var express = require('express');
var router = express.Router();
// khu vực viết code định nghia các link ở đây

var productCtrl = require('../controllers/product.ctrl');
// http://localhost:3000/products
router.get('/',productCtrl.DanhSach);
// http://localhost:3000/products/view/123456
router.get('/view/:id',productCtrl.XemChiTiet); 
// http://localhost:3000/products/add

router.get('/add', productCtrl.Them );// dùng cho lúc đầu vào trang
router.post('/add', productCtrl.Them ); // dùng cho bấm nút


// http://localhost:3000/products/edit/123456
// http://localhost:3000/products/edit/123456
router.get('/edit/:id', productCtrl.Sua);
router.post('/edit/:id', productCtrl.Sua);


// http://localhost:3000/products/delete/123456
router.get('/delete/:id',productCtrl.Xoa);
router.delete('/delete/:id',productCtrl.Xoa);

// chú ý: không được thiếu export
module.exports = router;


