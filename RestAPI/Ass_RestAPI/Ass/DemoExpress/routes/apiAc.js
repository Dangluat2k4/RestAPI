var express = require('express');
var router = express.Router();
// nhúng controller api vào
var apiCtrl = require('../controllers/apiAccount.ctrl');



// http://localhost:3000/api/products
router.get('/account',apiCtrl.DanhSach ); // xem toàn bộ ds
router.get("/getAccount/:id",apiCtrl.getAccount);

router.post('/addAC', apiCtrl.add);

router.post("/login",apiCtrl.login)

router.put('/updateAC/:id',apiCtrl.update);

router.delete('/deleteAC/:id',apiCtrl.delete);
module.exports = router;
