var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/gioithieu/1', (req,res,next)=>{
  res.send("trang gioi thieu user: ");
})
// tim kiem có thể thay đổi địa chỉ ID
router.get('/gioithieu/:id', (req,res,next)=>{
  res.send("trang gioi thieu user: " + req.params.id) ;
})
// tìm kiếm kiểu query

router.get('/gioithieu',(req,res,next)=>{
  res.send("Trang gioi thieu user :" + req.query.id);
})
module.exports = router;
