var express = require('express');
var router = express.Router();
// nhúng controller api vào
var apiCtrl = require('../controllers/apiBillDetail.ctrl');



// http://localhost:3000/api/products
router.get('/billDetail',apiCtrl.DanhSach ); // xem toàn bộ ds


router.post('/addBillDT', apiCtrl.add);

router.put('/updateBillDT/:id',apiCtrl.update);

router.delete('/deleteBillDT/:id',apiCtrl.delete);

router.get('/totalMoney', apiCtrl.calculateTotal);

module.exports = router;
    