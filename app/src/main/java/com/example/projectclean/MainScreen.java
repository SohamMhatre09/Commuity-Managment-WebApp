package com.example.projectclean;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.example.projectclean.adapters.EventsListAdapter;
import com.example.projectclean.dataBase.DataBaseAccessor;
import com.example.projectclean.models.EventModel;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class MainScreen extends AppCompatActivity {


    public class InternetListner extends BroadcastReceiver
    {
        MainScreen mainScreen;

        public InternetListner(MainScreen mainScreen) {
            this.mainScreen = mainScreen;
        }

        @Override
        public void onReceive(Context context, Intent intent) {
            mainScreen.getAllEventsFromCloud(mainScreen.vollyResponseListner);
        }
    }


    public interface VollyResponseListner
    {
        void onError(VolleyError error);
        void onResponce(JSONObject res);
    }

    BroadcastReceiver broadcastReceiver;

    RecyclerView recyclerView;
    EventsListAdapter eventsListAdapter;
    List<EventModel> events = new ArrayList<>();
    FloatingActionButton fab_add;
    DataBaseAccessor db;

    VollyResponseListner vollyResponseListner;

    private static final int newEventResultId = 101;

    private final EventsClickListener eventsClickListener = new EventsClickListener() {
        @Override
        public void onClick(EventModel event) {
            // TODO: MAKE A EVENTS PAGE TO VIEW IT AND MAKE CHANGE IN THE EVENT AND UPLOAD IMAGES
            Intent intent = new Intent(MainScreen.this, EventActivity.class);

            intent.putExtra("title", event.getTitle());
            intent.putExtra("date", event.getDate());
            intent.putExtra("city", event.getCity());
            intent.putExtra("address", event.getAddress());
            intent.putExtra("desc", event.getDescription());

            Log.d("checking show" ,"onClick: " + event.toString());



            startActivity(intent);
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_screen);

//        db = new DataBaseAccessor(this);

        recyclerView = findViewById(R.id.recMainHome);
//        fab_add = findViewById(R.id.fab_add_event);

//        fab_add.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                Intent intent = new Intent(MainScreen.this, EventsInputActivity.class);
//                startActivityForResult(intent, MainScreen.newEventResultId);
//            }
//        });

        //TODO: HERE GET ALL OF THE DATA
//        events = db.getAllEvents();
        broadcastReceiver = new InternetListner(this);
        registerReceiver(broadcastReceiver, new IntentFilter(ConnectivityManager.CONNECTIVITY_ACTION));

        vollyResponseListner = new VollyResponseListner() {
            @Override
            public void onError(VolleyError error) {
                Log.d("ReqError", "onError: erroe happened" + error.getMessage());
                ConnectivityManager connectivityManager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);

                NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();
                if (networkInfo == null)
                {
                    Toast.makeText(getApplicationContext(), "Please Enable internet/wifi", Toast.LENGTH_SHORT).show();
                }

                else
                {
                    Toast.makeText(getApplicationContext(), error.getMessage(), Toast.LENGTH_LONG).show();
                }


            }

            @Override
            public void onResponce(JSONObject res) {
                try {

                    List<EventModel> eventModels = new ArrayList<>();
                    JSONArray cloud_events = res.getJSONArray("events");

                    for (int i = 0; i < cloud_events.length(); i++) {
                        JSONObject jsonObject = cloud_events.getJSONObject(i);

                        try {
                            String eventId = jsonObject.getString("_id");
                            String title = jsonObject.getString("name");
                            String date = jsonObject.getString("date");
                            String city = jsonObject.getString("location");
                            String address = jsonObject.getString("location");
                            String desc = jsonObject.getString("description");
                            String img_url = jsonObject.getString("imageLink");

                            EventModel event = new EventModel(0,eventId, title, date, city, address ,desc, img_url);
                            events.add(event);
                        }
                        catch (Exception e)
                        {

                        }

                    }

                    updateRecycler(events);
                } catch (JSONException e) {
                    throw new RuntimeException(e);
                }

            }
        };
//        getAllEventsFromCloud(vollyResponseListner);

    }

//    @Override
//    protected void onResume() {
//        super.onResume();
//        registerReceiver(broadcastReceiver, new IntentFilter(ConnectivityManager.CONNECTIVITY_ACTION));
//
//    }

//    @Override
//    protected void onPause() {
//        super.onPause();
//        unregisterReceiver(broadcastReceiver);
//    }

    public void getAllEventsFromCloud(VollyResponseListner vollyResponseListner)
    {
        if (events.size() > 0) return;

        RequestQueue queue = Volley.newRequestQueue(MainScreen.this);
        String url = "https://gfg-hack-api.azurewebsites.net/user/events";

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, url, null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {

                try {
                    vollyResponseListner.onResponce(response);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                vollyResponseListner.onError(error);
            }
        });

        queue.add(request);

    }



    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        // save event
        if (requestCode == MainScreen.newEventResultId) {
            if (resultCode == Activity.RESULT_OK) {
                if (data != null) {
                    EventModel new_event = (EventModel) data.getSerializableExtra("event");
                    //todo: here insert
                    boolean result = db.insertEvent(new_event);
                    //failed insert
                    if (!result) {
                        Toast.makeText(MainScreen.this, "Event cant be created", Toast.LENGTH_SHORT).show();
                        return;
                    }
                    events.add(new_event);
                    eventsListAdapter.notifyItemInserted(events.size() - 1);
                }
            }
        }

    }

    private void updateRecycler(List<EventModel> events) {
        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        eventsListAdapter = new EventsListAdapter(MainScreen.this, events, eventsClickListener);
        recyclerView.setAdapter(eventsListAdapter);
    }


}