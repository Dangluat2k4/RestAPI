var express = require('express');
var router = express.Router();
// khu vực viết code định nghia các link ở đây

var billDetailRounter = require('../controllers/billDetails.ctrl');
// http://localhost:3000/products
router.get('/',billDetailRounter.ListBillDetail);


router.get('/view/:id',billDetailRounter.SeeBillDetail);

router.get('/add', billDetailRounter.AddBillDetail);// dùng cho lúc đầu vào trang
router.post('/add', billDetailRounter.AddBillDetail); // dùng cho bấm nút


router.get('/edit/:id', billDetailRounter.Update);
router.post('/edit/:id', billDetailRounter.Update);

router.get('/delete/:id',billDetailRounter.Delete);
router.delete('/delete/:id',billDetailRounter.Delete);


module.exports = router;