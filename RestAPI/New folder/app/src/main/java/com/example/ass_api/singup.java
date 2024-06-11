package com.example.ass_api;

import android.os.Bundle;
import androidx.fragment.app.FragmentActivity;

/*
 * Main Activity class that loads {@link MainFragment}.
 */
public class singup extends FragmentActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_singup);
        if (savedInstanceState == null) {
            getSupportFragmentManager().beginTransaction()
                .replace(R.id.main_browse_fragment, new MainFragment())
                .commitNow();
        }
    }
}