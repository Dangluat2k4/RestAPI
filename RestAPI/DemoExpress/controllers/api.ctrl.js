var myMD = require('../models/spModel')
var fs = require('fs'); // thư viện xử lý về file
var {userModel} = require('../models/user.model');
const bcrypt = require("bcrypt");

exports.doLogin = async (req, res, next)=>{

    try {

        const user = await userModel
                    .findByCredentials(req.body.username, req.body.passwd)
        if (!user) {
            return res.status(401)
                    .json({error: 'Sai thông tin đăng nhập'})
        }
        // đăng nhập thành công, tạo token làm việc mới
        const token = await user.generateAuthToken()

        return res.status(200).send({ user, token })

    } catch (error) {
        console.log(error)
        return res.status(400).send(error.message)
    }
  
}

exports.doReg = async (req, res, next)=>{


    try {
        const salt = await bcrypt.genSalt(10);

        const user = new userModel(req.body);

        user.passwd = await bcrypt.hash(req.body.passwd, salt);
 
        const token = await user.generateAuthToken();

        let new_u = await user.save()

        return res.status(201).send({ user: new_u, token })

    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }
 

    res.json( {status: 1, msg: 'Trang đăng ký'});
}




exports.DanhSach = async (req, res, next) => {
    
    // cải tiến thêm điều kiện lọc
    let dk = null;
    if (typeof (req.query.price) != 'undefined') {
        dk = { price: req.query.price } // lọc chính xác

        //lấy các sp giá lớn hơn hoặc bằng giá đã nhập
        // dk = { price: {$gte: req.query.price}}
    }

    let list = await myMD.spModel.find(dk).sort({ name: 1 });

    res.status(200).json({
        data: list,
        msg: 'Lấy dữ liệu thành công'
    })
}

exports.XemChiTiet = async (req, res, next) => {
    
}

exports.Them = async (req, res, next) => {
    let msg = '';
    try {
        
            //1. Lấy dữ liệu từ form gửi lên
            let { name, price } = req.body;

            // có thể kiểm tra hợp liệu ở đây hoặc sau này cho vào middleware cài ở router
            //vd kiểm tra:
            if(name.length <3) 
            {
                msg = 'Cần nhập tên SP ít nhất 3 ký tự';
                return res.render('product/them', {msg: msg}); // chú ý: phải có chữ return
                // các trường dữ liệu khác làm tương tự
            }

            // Tạo đối tượng để ghi vào CSDL
            let objSP = new myMD.spModel();
            objSP.name = name;
            objSP.price = price;
 
            // Ghi vào CSDL
            let kq = await objSP.save();
            msg = 'Thêm thành công, id mới = '+ kq._id;
        res.status(201).json({msg:msg});

    } catch (err) {
        msg = err.message;
        res.status(500).json({msg:msg});
    }
    
}
 



exports.Sua = async (req, res, next) => {
    
}