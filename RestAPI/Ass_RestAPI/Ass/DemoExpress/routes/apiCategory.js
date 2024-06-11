var express = require('express');
var router = express.Router();
// nhúng controller api vào
var apiCategoryCtrl = require('../controllers/aipCategory.ctrl');



// http://localhost:3000/api/products
router.get('/category',apiCategoryCtrl.DanhSach ); // xem toàn bộ ds


router.post('/addCTG', apiCategoryCtrl.add);

router.put('/updateCTG/:id',apiCategoryCtrl.update);

router.delete('/deleteCTG/:id',apiCategoryCtrl.delete);
module.exports = router;
