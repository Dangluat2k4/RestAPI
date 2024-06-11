var express = require('express');
var router = express.Router();
var productCtrl = require('../controllers/product.ctrl');
// khu vực viết code định nghĩa các link ở đây

router.get('/', productCtrl.Danhsach);

router.get('/view/:id', productCtrl.XemChiTiet);

router.get('/add', productCtrl.Them);
router.post('/add', productCtrl.Them);
    


router.get('/edit/:id', productCtrl.Sua);
router.post('/edit/:id', productCtrl.Sua);

router.get('/delete/:id', (req, res, next) => {
    res.send("<h1>Xoá sản phẩm</h1>");
});



// chú ý: ko đc thiếu export
module.exports = router;