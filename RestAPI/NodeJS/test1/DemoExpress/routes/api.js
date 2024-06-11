var express = require('express');
var router = express.Router();
// nhúng controller api vào
var apiCtrl = require('../controllers/api.ctrl');
var mdw = require('../middleware/api.auth');


// dành cho upload file
var multer = require('multer');
var objUpload = multer( { dest: './tmp'}); // vào thư mục code tạo 1 thư mục tmp


// http://localhost:3000/api/login
router.post('/login', apiCtrl.dologin);
router.post('/reg', apiCtrl.doReg);







// http://localhost:3000/api/products
router.get('/products',apiCtrl.DanhSach ); // xem toàn bộ ds


// http://localhost:3000/api/products/123456
router.get('/products/:id', apiCtrl.XemChiTiet);




// http://localhost:3000/products/add
//router.post('/products', objUpload.single('anh'), apiCtrl.Them );


// http://localhost:3000/products/edit/123456
router.put('/products/:id', apiCtrl.Sua);




// http://localhost:3000/products/delete/123456
router.delete('/products/:id', (req, res, next)=>{
   res.send("<h1>Xóa sản phẩm</h1>");
});


// chú ý: không được thiếu export
module.exports = router;
