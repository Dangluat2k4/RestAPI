var express = require('express');
var router = express.Router();
// khu vuc viet co dinh cac link o day
var productCtrl = require('../controllers/product.ctrl');

// danh cho upload file
var multer = require('multer');
var objUpload = multer({dest:'../tmp/'});


// chu y khong duoc thieu export
// http://localhost:3000/products
router.get('/',productCtrl.DanhSach );
// http://localhost:3000/products/view/123456
router.get('/view/:id',productCtrl.XemChiTiet );
// http://localhost:3000/products/add
router.get('/add',productCtrl.Them);
router.post('/add',objUpload.single('anh'), productCtrl.Them);

// http://localhost:3000/products/edit/123456
router.get('/edit/:id', productCtrl.Sua);
router.post('/edit/:id', productCtrl.Sua);
// http://localhost:3000/products/delete/123456
router.get('/delete/:id',productCtrl.Xoa);
router.delete('/delete/:id',productCtrl.Xoa);

    
module.exports = router;