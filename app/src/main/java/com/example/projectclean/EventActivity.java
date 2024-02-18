package com.example.projectclean;

import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;

import android.os.Bundle;
import android.widget.TextView;

import com.example.projectclean.adapters.EventsListAdapter;

public class EventActivity extends AppCompatActivity {


    TextView txt_title, txt_date, txt_city, txt_address, txt_desc;
    ConstraintLayout constraintLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_event);

        String title = getIntent().getStringExtra("title");
        String date = getIntent().getStringExtra("date");
        String city = getIntent().getStringExtra("city");
        String address = getIntent().getStringExtra("address");
        String desc = getIntent().getStringExtra("desc");

        txt_title = findViewById(R.id.show_txt_edit_title);
        txt_date = findViewById(R.id.show_txt_edit_date_field);
        txt_city = findViewById(R.id.show_txt_edit_city);
        txt_address = findViewById(R.id.show_txt_edit_address);
        txt_desc = findViewById(R.id.show_txt_edit_description);
        constraintLayout = findViewById(R.id.show_event_background);


        txt_title.setText("Name: " + title);
        txt_date.setText("Date: " + date);
        txt_city.setText("City: " + city);
        txt_address.setText("Address: " + address);
        txt_desc.setText("Description: " + desc);

        int color = EventsListAdapter.getRandColor();
        constraintLayout.setBackgroundColor(getResources().getColor(color,null));

    }
}