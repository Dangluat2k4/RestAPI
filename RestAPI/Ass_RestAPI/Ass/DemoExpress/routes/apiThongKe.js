var express = require('express');
var router = express.Router();
// nhúng controller api vào
var apiTTCtrl = require('../controllers/apiThongKe.ctrl');



// http://localhost:3000/api/products
router.get('/thongke',apiTTCtrl.calculateTotal); // xem toàn bộ ds

module.exports = router;
