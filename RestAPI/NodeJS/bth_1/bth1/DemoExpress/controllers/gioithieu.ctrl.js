const { render } = require("../app");

exports.DanhSach = (req, res, next) => {
  //res.send("<h1>trang gioi thieu hahaha</h1>");
  let tieu_de = 'Giới thiệu bản thân : ';
  let name_user = 'Đặng Chí Luật';
  res.render('gioithieu/gioithieu', {
    tieuDe: tieu_de,
    Name: name_user,
    "Image": "img/z5203565081110_7d71d214daf10feb10e43cdfb21bfeed.jpg",
    "name": "Timoth<y>",
    "Age": "19",
    "chuyenNganh": "lập trình mobile",
    "interest": "đi bộ, chơi game"
  });
}
exports.chiTiet = (req, res, next) => {
  res.send("<h1>xem chi tiet san pham</h1>");
}
exports.AddDS = (req, res, next) => {
  res.send("<h1>trang them moi san pham 1</h1>");
}
exports.editDS = (req, res, next) => {
  res.send("<h1>trang sua san pham</h1>");
}
exports.deleteDS = (req, res, next) => {
  res.send("<h1>trang xóa sản phẩm</h1>");
}
