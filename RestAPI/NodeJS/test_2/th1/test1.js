// tao server don gian
// init thu vien : npm init

const http = require('http');
const server = http.createServer((req,res)=>{
    res.writeHead(200,"ket noi thanh cong",{
        'Content-Type':'text/html'
    })
    // viet noi dung gui xuong client
res.write("<meta charset ='utf-8'/><h1>Xin chao</h1>");
res.end();// ket thuc lenh gui xuong Client
});
// khoi dong server 
server.listen(8080);
console.log("Server dang chay o dia chi : http://localhost:8080");


