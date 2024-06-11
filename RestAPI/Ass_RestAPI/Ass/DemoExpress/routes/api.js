var express = require('express');
var router = express.Router();
// nhúng controller api vào
var apiCtrl = require('../controllers/api.ctrl');

const multer  = require('multer')
var objUpload = multer( { dest: '../tmp'});

router.post('/login', apiCtrl.dologin);
router.post('/reg', apiCtrl.doReg);
router.get('/products',  apiCtrl.DanhSach );


// http://localhost:3000/products/edit/123456
router.post('/add', apiCtrl.add);

router.post("/updateStatus/:id", apiCtrl.updateFV);

router.post("/updatStatusFV/:id", apiCtrl.updateUnFV);

router.put('/update/:id',apiCtrl.update);

router.delete('/delete/:id', apiCtrl.delete);

router.get('/timkiem', apiCtrl.timKiem);

router.post('/uploadIMG',objUpload.single('hinh_anh'),apiCtrl.uploadIMG);

// http://localhost:3000/products/delete/123456
/*
// http://localhost:3000/api/products/123456
router.get('/products/:id', apiCtrl.XemChiTiet    );




// http://localhost:3000/products/add
router.post('/products', objUpload.single('anh'), apiCtrl.Them );


// http://localhost:3000/products/edit/123456
router.put('/products/:id', apiCtrl.Sua);




// http://localhost:3000/products/delete/123456
router.delete('/products/:id', (req, res, next)=>{
   res.send("<h1>Xóa sản phẩm</h1>");
});
*/

// chú ý: không được thiếu export
module.exports = router;
