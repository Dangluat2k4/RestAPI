console.log("Chạy file index");

//Tạo server web đơn giản
// 1. init thư viện: npm init
const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, "Ket noi thanh cong", {
        'Content-Type': 'text/html'
    })
    // Viết nội dung gửi xống client
    res.write("<meta charset = 'utf-8'/><h1>Xin chào tất cả mọi người</h1>");
    res.write("<h1>Dòng mới thêm</h1>");
    res.end();
});

// khởi động server
server.listen(8080);
console.log("Server đang chạy ở địa chỉ: http://localhost:8080");
// chạy lệnh: node vd-server.js sau đó mở trình duyệt web vào địa chỉ trên  