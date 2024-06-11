var myMD = require('../model/spModel')
exports.Danhsach = async (req, res, next) => {

    let list =await myMD.spModel.find().sort({Password:1});

    
    res.render('product/danh-sach',{listSP : list });
}

exports.XemChiTiet = async(req, res, next) => {
    let objSP= null;
    let msg = '';
    try {
        let id = req.params.id;

        objSP = await myMD.spModel.findOne({_id: id});

        // xuống đến dòng nàt là không có lỗi
        msg = 'Lấy dữ liệu thành công';

    } catch (error) {
        msg = error.message;
    }
    res.render('product/chi-tiet',{objSP : objSP, msg:msg });
}

exports.Them = async (req, res, next)=>{
    let msg = '';
    try {
        if (req.method == 'POST') {
            //1. Lấy dữ liệu từ form gửi lên
            let {Password, Fullname} = req.body;
    
            //có thể kiểm tra hợp liệu ở đây hoặc sau này cho vào middleware cài ở router
            //vd kiểm tra:
            if (Fullname.length < 3) {
                msg = 'Cần nhập tên  ít nhất 3 kí tự';
                return res.render('product/them', {msg:msg}); //chú ý: phải có chữ return
            }
            //Tạo đối tượng để ghi vào csdl
            let objSP = new myMD.spModel();
            objSP.Password = Password;
            objSP.Fullname = Fullname;
            //ghi vào csdl
            let kq = await objSP.save();
            msg = 'Thêm thành công, id mới = '+ kq._id;
        }
    } catch (err) {
        msg = err.message;
    }


    res.render('product/them', {msg:msg});
}

exports.Sua = async (req, res, next)=>{
    let msg = '';
    try {
        
        //Lấy thông tin sản phẩm: copy ở xem chi tiết
        let id = req.params.id;
        objSP = await myMD.spModel.findOne({_id: id});
        msg = 'Lấy dữ liệu thành công';

        //kiểm tra sự kiện post ở đây
        if (req.method == 'POST') {
            //1. Lấy dữ liệu từ form gửi lên
            let {Password, Fullname} = req.body;
    
            //có thể kiểm tra hợp liệu ở đây hoặc sau này cho vào middleware cài ở router
            //vd kiểm tra:
            if (Fullname.length < 3) {
                msg = 'Cần nhập tên  ít nhất 3 kí tự';
                return res.render('product/sua', {msg:msg, objSP:objSP}); //chú ý: phải có chữ return
            }
            //Tạo đối tượng để ghi vào csdl
            let objSP_new = {}; //Tạo đối tượng thường, ko phải model
            objSP_new.Password = Password;
            objSP_new.Fullname = Fullname;
            //ghi vào csdl
            let kq = await myMD.spModel.findByIdAndUpdate(req.params.id, objSP_new);
            msg = 'cập nhật thành công ';
        }
        
    } catch (err) {
        msg = err.message;
    }


    res.render('product/sua', {msg:msg, objSP:objSP});
}

