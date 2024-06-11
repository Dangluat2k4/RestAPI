var express = require('express');
var router = express.Router();
// khu vực viết code định nghia các link ở đây

var accountRouter = require('../controllers/account.ctrl');
// http://localhost:3000/products
router.get('/',accountRouter.ListAccount);

router.get('/view/:id',accountRouter.SeeDetail);


router.get('/add', accountRouter.AddAccount);// dùng cho lúc đầu vào trang
router.post('/add', accountRouter.AddAccount ); // dùng cho bấm nút


router.get('/edit/:id', accountRouter.Update);
router.post('/edit/:id', accountRouter.Update);

router.get('/delete/:id',accountRouter.Delete);
router.delete('/delete/:id',accountRouter.Delete);

 
module.exports = router;


