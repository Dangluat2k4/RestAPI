var express = require('express');
var router = express.Router();
var productCtrl = require('../controllers/gioithieu.ctrl');
router.get('/',productCtrl.DanhSach);

router.get('/view/:id',productCtrl.chiTiet);

router.get('/add',productCtrl.AddDS);
router.get('/edit',productCtrl.editDS);
router.get('/delete/:id',productCtrl.deleteDS);



module.exports = router;