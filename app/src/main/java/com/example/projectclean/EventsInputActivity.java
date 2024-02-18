package com.example.projectclean;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.example.projectclean.models.EventModel;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.datepicker.MaterialDatePicker;
import com.google.android.material.datepicker.MaterialPickerOnPositiveButtonClickListener;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.Random;

public class EventsInputActivity extends AppCompatActivity {

    EditText title;
    TextView date;
    EditText desc;
    EditText city;
    EditText address;

    MaterialButton create_btn;

    EventModel event;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.event_input);

        title = findViewById(R.id.txt_edit_title);
        date = findViewById(R.id.txt_edit_date_field);
        city = findViewById(R.id.txt_edit_city);
        address = findViewById(R.id.txt_edit_address);
        desc = findViewById(R.id.txt_edit_description);
        create_btn = findViewById(R.id.create_btn);


        date.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                MaterialDatePicker<Long> materialDatePicker = MaterialDatePicker.Builder.datePicker()
                        .setTitleText("Select event date")
                        .setSelection(MaterialDatePicker.todayInUtcMilliseconds())
                        .build();

                materialDatePicker.addOnPositiveButtonClickListener(new MaterialPickerOnPositiveButtonClickListener<Long>() {
                    @Override
                    public void onPositiveButtonClick(Long selection) {
                        String dateStr = new SimpleDateFormat("MM-dd-yyy", Locale.getDefault()).format(new Date(selection));
                        date.setText(dateStr);
                    }
                });

                materialDatePicker.show(getSupportFragmentManager(), "tag");
            }
        });


        create_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String t = title.getText().toString();
                String dateStr = date.getText().toString();
                String c = city.getText().toString();
                String add = address.getText().toString();
                String d = desc.getText().toString();

                if (t.isEmpty() || dateStr.isEmpty() || c.isEmpty() || add.isEmpty() || d.isEmpty())
                {
                    Toast.makeText(EventsInputActivity.this,"Please fill out all the fields", Toast.LENGTH_SHORT).show();
                    return;
                }
                // TODO: GET DATE PICKER
                //TODO: MAKE A BETTER ID
                Random random = new Random();
                String randId = String.valueOf(random.nextInt(1000));

                event = new EventModel(0, "Event " + randId, t, dateStr, c, add, d, "");

                Intent intent = new Intent();
                intent.putExtra("event",event);
                setResult(Activity.RESULT_OK, intent);
                finish();
            }
        });
    }
}