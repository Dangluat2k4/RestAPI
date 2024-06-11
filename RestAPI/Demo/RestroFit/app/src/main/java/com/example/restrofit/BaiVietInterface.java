package com.example.restrofit;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

public interface BaiVietInterface {
    // Lấy danh sách bài viết
    @GET("BaiViet")
    Call<List<BaiViet>> lay_danh_sach();

    // thêm mới bài viết
    @POST("BaiViet")
    Call<BaiViet> them_bai_viet (@Body BaiViet objBaiViet);


}
