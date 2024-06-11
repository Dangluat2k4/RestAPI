var myMD = require('../models/cardModel')
const spModel = require('../models/spModel');
var myAC = require('../models/acModel')

exports.DanhSach = async (req, res, next) => {
    // cải tiến thêm điều kiện lọc
    let dk = null;
    if (typeof (req.query.Price) != 'undefined') {
        dk = { Price: req.query.Price } // lọc chính xác
 
 
        //lấy các sp giá lớn hơn hoặc bằng giá đã nhập
        // dk = { price: {$gte: req.query.price}}
    }
    let list = await myMD.cartModel.find(dk).sort({ ProductID: 1 });
 
 
    res.status(200).json(list)

 }

 exports.addCart = async (req, res, next) => {
    try {
        // Lấy thông tin sản phẩm từ yêu cầu
        const { ProductID, Quantity, IDAccount } = req.body;

        // Tìm thông tin chi tiết của sản phẩm từ bảng Product
        const product = await spModel.spModel.findById(ProductID);
        // const account = await myAC.acModel.findById(IDAccount);
        if (!product) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        }

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        const existingCartItem = await myMD.cartModel.findOne({ ProductID: product._id });

        if (existingCartItem) {
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật thông tin của sản phẩm
            existingCartItem.Quantity += Quantity;
            existingCartItem.Price += product.Price * Quantity; // Cộng thêm giá của sản phẩm mới vào giá hiện tại
            existingCartItem.save();

            res.status(200).json({ message: "Cập nhật giỏ hàng thành công", cartItem: existingCartItem });
        } else {
            // Nếu sản phẩm chưa tồn tại trong giỏ hàng, tạo một bản ghi mới trong bảng Cart
            const newCartItem = new myMD.cartModel({
                ProductID: product._id,
                Name: product.ProductName,
                Price: product.Price * Quantity, // Giá của sản phẩm mới sẽ là giá của sản phẩm nhân với số lượng
                Description: product.Description,
                Quantity: Quantity,
                Image: product.Image,
            });

            // Lưu bản ghi mới vào bảng Cart
            await newCartItem.save();

            res.status(201).json({ message: "Thêm sản phẩm vào giỏ hàng thành công", cartItem: newCartItem });
        }
    } catch (error) {
        res.status(500).json({ message: "Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng", error: error });
    }
}

exports.delete = async(req,res,next)=>{
    try{
        let id = req.params.id;
        let result = await myMD.cartModel.findByIdAndDelete(id);
        res.json({status:"delete thanh cong", result: result});
    }catch(error){
        res.json({status:"delete khong thanh cong", result : error});
    }
};
exports.timKiem  = async (req, res,next)=>{
    try {
        let keyword = req.query.keyword;
        let danhSachTimKiem = await myMD.cartModel.find({Name:{$regex:keyword, $options:"i"}});
        res.json(danhSachTimKiem);
    } catch (error) {
        res.json({status:"loi tim kiem", result:error});
    }
}

