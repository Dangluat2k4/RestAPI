exports.MyProfile = (req, res, next) => {
    // res.send("<h1>Danh sách sản phẩm</h1>");
    let tieu_de = 'My ProFile';


    res.render('profiles/manh', { tieuDe: tieu_de 
        
    });
}
