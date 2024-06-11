var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/xem/123', (req, res, next) => {
  res.send("Trang chi tiết user: ");
});

// cải tiến: số 123 là id của user, có thể thay đổi trên địa chỉ
router.get('/xem/:id', (req, res, next) => {
  res.send("Trang chi tiết user: "+req.params.id);
});

// truyền tham số trên địa chỉ kiểu query
router.get('/xem', (req, res, next) => {
  res.send("Trang chi tiết user: "+req.query.id);
});

module.exports = router;
