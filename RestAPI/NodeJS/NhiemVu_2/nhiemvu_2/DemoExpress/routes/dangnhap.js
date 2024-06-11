var express = require('express');
var router = express.Router();
var nhiemvu = require('../nhiemvu/dangnhap.vn')
router.get('/',nhiemvu.DangNhap);

module.exports = router;