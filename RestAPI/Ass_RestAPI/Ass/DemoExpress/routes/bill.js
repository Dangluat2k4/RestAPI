var express = require('express');
var router = express.Router();
// khu vực viết code định nghia các link ở đây

var billRounter = require('../controllers/bill.crtl');
// http://localhost:3000/products
router.get('/',billRounter.ListBill);

router.get('/view/:id',billRounter.BillDetail);

router.get('/add', billRounter.AddBill);// dùng cho lúc đầu vào trang
router.post('/add', billRounter.AddBill); // dùng cho bấm nút


router.get('/edit/:id', billRounter.Update);
router.post('/edit/:id', billRounter.Update);

router.get('/delete/:id',billRounter.Delete);
router.delete('/delete/:id',billRounter.Delete);


module.exports = router;