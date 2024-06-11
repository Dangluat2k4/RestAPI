var express  = require('express');
var routes = express.Router();
var  loginCrtl = require('../controllers/login.ctrl');
routes.get('/',loginCrtl.login);

routes.get('/trangchu',loginCrtl.trangChu);
routes.get('/tintuc',loginCrtl.tinTuc);
routes.get('/sanPham',loginCrtl.sanPham);
routes.get('/lienHe',loginCrtl.lienHe);
module.exports = routes;