var express = require('express');
var router = express.Router();
// khu vực viết code định nghia các link ở đây

var categoryRounter = require('../controllers/category.ctrl');
// http://localhost:3000/products
router.get('/',categoryRounter.ListCategory);


router.get('/view/:id',categoryRounter.SeeCategory);

router.get('/add',categoryRounter.AddCategory);// dùng cho lúc đầu vào trang
router.post('/add', categoryRounter.AddCategory); // dùng cho bấm nút


router.get('/edit/:id', categoryRounter.Update);
router.post('/edit/:id', categoryRounter.Update);

router.get('/delete/:id',categoryRounter.Delete);
router.delete('/delete/:id',categoryRounter.Delete);

module.exports = router;