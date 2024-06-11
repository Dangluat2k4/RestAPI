var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// http://localhost:3000/users/xem/123
router.get('/xem/123', (req, res, next) => {
  res.send('Trang chi tiết users: ');
})
// cải tiến: số 123 là id của user, và có thể thay đổi trên địa chỉ
// http://localhost:3000/users/xem/xxxxx với xxxxx là 1 số bất kỳ
router.get('/xem/:id', (req, res, next) => {
  res.send('Trang chi tiết users: ' + req.params.id);
})

//truyền tham số trên địa chỉ kiểu query
// http://localhost:3000/users/xem?id=2222

router.get('/xem', (req, res, next) => {
  res.send('Trang chi tiết users: ' + req.params.id);
})

module.exports = router;
