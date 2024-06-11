var myMD = require('../models/billDetailsModel')
var myPR =  require('../models/spModel')
var fs = require('fs'); // thư viện xử lý về file


exports.DanhSach = async (req, res, next) => {
    // cải tiến thêm điều kiện lọc
    let dk = null;
    if (typeof (req.query.Price) != 'undefined') {
        dk = { Price: req.query.Price } // lọc chính xác
 
 
        //lấy các sp giá lớn hơn hoặc bằng giá đã nhập
        // dk = { price: {$gte: req.query.price}}
    }
    let list = await myMD.billDetailModel.find(dk).sort({ Quantity: 1 });
 
 
    res.status(200).json(list)
 
 }
 exports.add = async (req, res, next) => {
    try {
        // console.log(req.body);
        let obj = new myMD.billDetailModel({
            
            BillID: req.body.BillID,
            ProductID: req.body.ProductID,
            Quantity: req.body.Quantity,

        });
        let result = await obj.save()
        res.json({ status: "Add thành công", result: result })
    } catch (error) {
        res.json({ status: "Add  lỗi", result: error })
    }
  
}

exports.update = async (req, res, next) => {
    try {
      let id = req.params.id;
      let obj = {};
      obj.BillID = req.body.BillID;
      obj.ProductID = req.body.ProductID;
      obj.Quantity = req.body.Quantity;

      let result = await myMD.billDetailModel.findByIdAndUpdate(id, obj, { new: true });
      res.json({ status: "update thanh cong", result: result });
    } catch (error) {
      res.json({ status: "update khong thanh cong", result: error });   
    }
  };
  

exports.delete = async(req,res,next)=>{
        try{
            let id = req.params.id;
            let result = await myMD.billDetailModel.findByIdAndDelete(id);
            res.json({status:"delete thanh cong", result: result});
        }catch(error){
            res.json({status:"delete khong thanh cong", result : error});
        }
};



// Hàm xử lý yêu cầu tính tổng tiền
exports.calculateTotal = async (req, res, next) => {
    try {
        // Lấy danh sách bill details
        let billDetails = await myMD.billDetailModel.find();

        // Khởi tạo biến tổng tiền
        let total = 0;

        // Duyệt qua từng bill detail để tính tổng tiền
        for (let i = 0; i < billDetails.length; i++) {
            // Lấy thông tin của sản phẩm từ bill detail
            let billDetail = billDetails[i];
            let product = await myPR.spModel.findOne({ _id: billDetail.ProductID });

            // Nếu sản phẩm tồn tại và có giá, tính tổng tiền
            if (product && product.Price) {
                total += product.Price * billDetail.Quantity;
            }
        }

        // Trả về kết quả tổng tiền
        res.status(200).json({ total: total });
    } catch (error) {
        // Nếu có lỗi, trả về thông báo lỗi
        res.status(500).json({ error: error.message });
    }
}


