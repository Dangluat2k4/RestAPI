var express = require('express');
var router = express.Router();
// nhúng controller api vào
var apiCtrl = require('../controllers/apiBill.ctrl');



// http://localhost:3000/api/products
router.get('/bill',apiCtrl.DanhSach ); // xem toàn bộ ds



router.post('/addBill', apiCtrl.add);

router.put('/updateBill/:id',apiCtrl.update);

router.delete('/deleteBill/:id',apiCtrl.delete);


router.get('/timkiem', apiCtrl.timKiem);
// chú ý: không được thiếu export
module.exports = router;
