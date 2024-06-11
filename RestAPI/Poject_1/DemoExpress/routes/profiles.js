var express = require('express');
var router = express.Router();
var profilesCtrl = require('../controllers/profiles.ctrl');
// Code here

router.get('/',profilesCtrl.MyProfile)

// http://localhost:3000/profiles/manh
router.get('/manh/:id', profilesCtrl.MyProfile)

// chú ý: không được thiếu export
module.exports = router;
