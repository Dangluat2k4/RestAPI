var myTT = require('../models/thongKeModel')
var myMD = require('../models/billDetailsModel')
var myPR =  require('../models/spModel')


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
        let id = req.params.id;
        let updateObj = { thongKe: total };
        // Thực hiện cập nhật document thống kê và trả về document đã được cập nhật
        let result = await myTT.ttModel.findByIdAndUpdate(id, updateObj, { new: true });
        // Trả về kết quả tổng tiền
        res.json({ status: "update thanh cong", result: result });
    } catch (error) {
        // Nếu có lỗi, trả về thông báo lỗi
        res.status(500).json({ error: error.message });
    }
}