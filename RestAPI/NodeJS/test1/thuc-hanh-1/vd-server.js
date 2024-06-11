// tao server dweb don gian
// 1. init thu vien npm init(co the cai sau)
const http = require('http');
//req la bien dai dien gui len servern
// res phan hoi tro lai
const server = http.createServer((req,res)=>{
    res.writeHead(200,"ket noi thanh cong",{
        'Content-Type':'text/html'
    })
    // viet noi dung gui xuong client
    res.write("<meta charset='utf-8'//><h1>hello</h1>");
    res.end();// ket thuc gui xuong client
});

// khoi dong server
 server.listen(8000);
console.log("Server dang chay o dia chi : http://localhost:8000");
// chay lenh : node vd-server.js sau do mo trinh duyet vao web dia chi tren
