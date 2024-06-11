var myMD = require('../models/spModel')

var fs = require('fs');  // thu vien su ly ve file

var { userModel } = require('../models/user.models');
const bcrypt = require("bcrypt");
const { error } = require('console');
exports.dologin = async (req, res, next) => {
    try {


        const user = await userModel
            .findByCredentials(req.body.username, req.body.passwd)
        if (!user) {
            return res.status(401)
                .json({ error: 'Sai thông tin đăng nhập' })
        }
        // đăng nhập thành công, tạo token làm việc mới
        const token = await user.generateAuthToken()


        return res.status(200).send({ user, token })


    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }

}



exports.doReg = async (req, res, next) => {


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


    res.json({ status: 1, msg: 'Trang đăng ký' });
}

exports.DanhSach = async (req, res, next) => {
    // cải tiến thêm điều kiện lọc
    let dk = null;
    if (typeof (req.query.Price) != 'undefined') {
        dk = { Price: req.query.Price } // lọc chính xác
    }
    let list = await myMD.spModel.find(dk);
    res.status(200).json(list); // chỉ trả về mảng data
}

exports.add = async (req, res, next) => {
    try {
        // console.log(req.body);
        let obj = new myMD.spModel({
            ProductName: req.body.ProductName,
            Price: req.body.Price,
            Description: req.body.Description,
            Image: req.body.Image,
            Status: req.body.Status,
        });
        let result = await obj.save()
        res.json({ status: "Add thành công", result: result })
    } catch (error) {
        res.json({ status: "Add  Product loi ", result: error })
    }

}
exports.update = async (req, res, next) => {
    try {
        let id = req.params.id;
        let obj = {};
        obj.ProductName = req.body.ProductName;
        obj.Price = req.body.Price;
        obj.Description = req.body.Description;
        obj.CateID = req.body.CateID;
        let result = await myMD.spModel.findByIdAndUpdate(id, obj, { new: true });
        res.json({ status: "update thanh cong", result: result });
    } catch (error) {
        res.json({ status: "update khong thanh cong", result: error });
    }
};
exports.delete = async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await myMD.spModel.findByIdAndDelete(id);
        res.json({ status: "delete thanh cong", result: result });
    } catch (error) {
        res.json({ status: "delete khong thanh cong", result: error });
    }
};

// update favorite 
exports.updateFV = async (req, res, next) => {
    try {
        let id = req.params.id;
        let product  = await myMD.spModel.findById(id);

        if(!product){
            return res.json({ status: "khong tim thay san pham", result:null})
        }

        if(product.Status ===1){
            product.Status =0;

            let result  =  await product.save();
            return res.json({ status: "success", result: result})
        }
        else{
            return res.json({ status: "san pham co status la 0", return : null})
        }

    } catch (error) {
        res.json({ status: "update khong thanh cong", result: error });
    }
};


// update unfavorite 
exports.updateUnFV = async (req, res, next) => {
    try {
        let id = req.params.id;
        let product  = await myMD.spModel.findById(id);

        if(!product){
            return res.json({ status: "khong tim thay san pham", result:null})
        }

        if(product.Status ===0){
            product.Status =1;

            let result  =  await product.save();
            return res.json({ status: "success", result: result})
        }
        else{
            return res.json({ status: "san pham co status la 1", return : null})
        }

    } catch (error) {
        res.json({ status: "update khong thanh cong", result: error });
    }
};



exports.delete = async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await myMD.spModel.findByIdAndDelete(id);
        res.json({ status: "delete thanh cong", result: result });
    } catch (error) {
        res.json({ status: "delete khong thanh cong", result: error });
    }
};

exports.timKiem = async (req, res, next) => {
    try {
        let keyword = req.query.keyword;
        let danhSachTimKiem = await myMD.spModel.find({ ProductName: { $regex: keyword, $options: "i" } });
        res.json(danhSachTimKiem);
    } catch (error) {
        res.json({ status: "loi tim kiem", result: error });
    }
}
exports.uploadIMG = (req, res, next) => {
    try {
        if (fs.existsSync(req.file.path)) {
            // có tồn tại file
            // định nghĩa đường dẫn file mới để lưu trữ
            let file_path = './public/uploads/' + req.file.originalname;
            // có thể kiểm tra định dạng file ....
            console.log(req.file);
            // { kết quả log có các thuộc tính, bạn muốn kiểm tra gì thì req.file.xxxxx
            //     fieldname: 'anh',
            //     originalname: 'giao-dien-mua-hang.png',
            //     encoding: '7bit',
            //     mimetype: 'image/png',
            //     destination: './tmp',
            //     filename: '280990afd14931ba2d750ff76630544e',
            //     path: 'tmp/280990afd14931ba2d750ff76630544e',
            //     size: 676236
            //   }
            // ở đây tạm thời chỉ cho upload ảnh: 
            if (req.file.mimetype.indexOf('image') == -1) {
                // định dạng file chuẩn ảnh
                msg = 'Không đúng định dạng ảnh';
                return res.status(400).json({ error: 'Lỗi không đúng định dạng ảnh' });// thoát khỏi hàm
            }
            // đến đây là phù hợp điều kiện, chuyển file từ thư mục tmp và thư mục uploads để lưu trữ lâu dài
            fs.renameSync(req.file.path, file_path);
            // không có lỗi thì sẽ chạy xuống lệnh dưới đây, bạn ghép nối chuỗi thành link ảnh
            // chú ý: http://localhost:3000 là đoạn domain bạn cần thay đổi cho phù hợp với web của bạn
            let link_anh = 'http://localhost:3000/uploads/' + req.file.originalname;
            res.status(200).json({ error: null, link_anh: link_anh });
        } else {
            res.status(404).json({ error: 'Không có file upload' });
        }
    } catch (ex) {
        res.status(400).json({ error: ex.message });
    }
}