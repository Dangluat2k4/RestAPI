var express = require('express');
var router = express.Router();
// nhúng controller api vào
var apiCtrl = require('../controllers/apiCart.ctrl');


router.get('/cart',apiCtrl.DanhSach);

router.post('/addToCart',apiCtrl.addCart);
router.delete('/deleteCart/:id',apiCtrl.delete);
router.get('/timkiem', apiCtrl.timKiem);
/*

// http://localhost:3000/api/products
router.get('/billDetail',apiCtrl.DanhSach ); // xem toàn bộ ds


router.post('/addBillDT', apiCtrl.add); 

router.put('/updateBillDT/:id',apiCtrl.update);

router.delete('/deleteBillDT/:id',apiCtrl.delete);

router.get('/totalMoney', apiCtrl.calculateTotal);
*/

module.exports = router;