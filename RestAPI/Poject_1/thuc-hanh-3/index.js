var express = require('express');
var app = express();
app.get('/', (req, res) => {
    res.send("<h1>Xin chao express </h1>");
});
app.get('/gioithieu.html', (req, res) => {
    res.send("<h1>Trang giới thiệu</h1>");
});
app.get('/abc.html', (req, res) => {
    res.send("<h1>Bạn đang chạy ABC</h1>");
})
app.listen(8080, (err) => {
    if (err)
        console.log(err);
    console.log("Server đã chạy ");
})
