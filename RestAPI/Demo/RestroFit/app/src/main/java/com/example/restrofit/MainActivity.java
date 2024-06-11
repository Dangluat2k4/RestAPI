package com.example.restrofit;

import static androidx.constraintlayout.helper.widget.MotionEffect.TAG;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Toast;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {
    EditText edtTitle, edtContent;
    Button btnSave;
    ListView lv_baiviet;
    ArrayAdapter arrayAdapter;
    List<BaiViet> ds_baiviet;
    static String BASE_URL = "https://65bb342b52189914b5bb6770.mockapi.io/"; //nhớ phải có gạch chéo /

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        edtContent = findViewById(R.id.edtContent);
        edtTitle = findViewById(R.id.edtTitle);
        btnSave = findViewById(R.id.btnSave);
        lv_baiviet = findViewById(R.id.lv_baiviet);

        // khởi tạo danh sách roognx để lúc vào app sẽ không bị lỗi khi mạng chậm
        ds_baiviet = new ArrayList<BaiViet>();
        arrayAdapter = new ArrayAdapter(this, android.R.layout.simple_list_item_1, ds_baiviet);
        lv_baiviet.setAdapter(arrayAdapter);

        LayDanhSachBaiViet();

        btnSave.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // lấy dữ liệu trên form cho vào đối tượng
                String title = edtTitle.getText().toString();
                String content = edtContent.getText().toString();

                BaiViet b = new BaiViet();
                b.setTitle(title);
                b.setContent(content);
                
                // gọi hàm thêm
                ThemBaiViet(b);
            }
        });

    }

    void LayDanhSachBaiViet() {
        // B1: tạo đối tượng chuyển đổi GSON
        Gson gson = new GsonBuilder().setLenient().create();
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();
        // sử dụng interface để lấy danh sách
        BaiVietInterface baiVietInterface = retrofit.create(BaiVietInterface.class);
        // tạo đối tượng call để gọi gàm lấy ds
        Call<List<BaiViet>> objCall = baiVietInterface.lay_danh_sach();
        // thực thi lệnh lấy dữ liệu
        objCall.enqueue(new Callback<List<BaiViet>>() {
            @Override
            public void onResponse(Call<List<BaiViet>> call, Response<List<BaiViet>> response) {
                // kết nối thành công
                Log.d("zzzzzzz", "ket qua: " + response.body().toString());

                if (response.isSuccessful()) {
                    // cập nhật dữ liệu vào listView
                    ds_baiviet.clear();
                    ds_baiviet.addAll(response.body());
                    arrayAdapter.notifyDataSetChanged();
                } else {
                    Log.d("zzzzzzz", "onResponse: Không lấy được ds");
                }
            }

            @Override
            public void onFailure(Call<List<BaiViet>> call, Throwable throwable) {
                Log.d("zzzzzzz", "onFailure: Lỗi" + throwable.getMessage());
                throwable.printStackTrace();
            }
        });

    }

    void ThemBaiViet(BaiViet objBaiViet) {
        // B1: tạo đối tượng chuyển đổi GSON
        Gson gson = new GsonBuilder().setLenient().create();
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();

        // sử dụng interface để lấy danh sách
        BaiVietInterface baiVietInterface = retrofit.create(BaiVietInterface.class);
        // tạo đối tượng call để gọi gàm lấy ds
        Call<BaiViet> objCall = baiVietInterface.them_bai_viet(objBaiViet);

        objCall.enqueue(new Callback<BaiViet>() {
            @Override
            public void onResponse(Call<BaiViet> call, Response<BaiViet> response) {
                // xử lý kết quả thêm
                if (response.isSuccessful()){
                    // lấy kết quả
                    BaiViet b = response.body();
                    // cách 1: Gọi hàm load lại ds, phải gọi hàm lên server
                    LayDanhSachBaiViet();
                    // cách 2: Insert phẩn tử này vào list rồi notify lại adapter


                }else {
                    Log.d("zzzzzzz", "onResponse: Không thêm được dữ liệu");
                }

            }

            @Override
            public void onFailure(Call<BaiViet> call, Throwable throwable) {
                Log.d("zzzzzzz", "onFailure: Lỗi" + throwable.getMessage());
                throwable.printStackTrace();
            }
        });
    }
}