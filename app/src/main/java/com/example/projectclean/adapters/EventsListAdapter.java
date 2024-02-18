package com.example.projectclean.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.example.projectclean.EventsClickListener;
import com.example.projectclean.R;
import com.example.projectclean.models.EventModel;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class EventsListAdapter extends RecyclerView.Adapter<EventsViewHolder>{

    Context context;
    List<EventModel> events;

    EventsClickListener listener;

    public EventsListAdapter(Context context, List<EventModel> events, EventsClickListener listener) {
        this.context = context;
        this.events = events;
        this.listener = listener;
    }

    @NonNull
    @Override
    public EventsViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return new EventsViewHolder(LayoutInflater.from(context).inflate(R.layout.events_list, parent, false));
    }

    @Override
    public void onBindViewHolder(@NonNull EventsViewHolder holder, int position) {
        holder.txt_event_title.setText(events.get(position).getTitle());
//        holder.txt_event_title.setSelected(true);

        holder.txt_event_date.setText(events.get(position).getDate());

        holder.txt_event_city.setText(events.get(position).getCity());

//      holder.txt_event_date.setSelected(true);

        int rand_col = EventsListAdapter.getRandColor();
        holder.events_container.setCardBackgroundColor(holder.itemView.getResources().getColor(rand_col, null));
        holder.events_container.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                listener.onClick(events.get(holder.getAdapterPosition()));
            }
        });

        //TODO: INIT THE IMAGE HERE

        if (events.get(position).getImg_url().contains("https"))
        {
            Glide.with(context).load(events.get(position).getImg_url()).into(holder.img_event_photo);
        }

    }

    public static int getRandColor()
    {
        List<Integer> colorCode = new ArrayList<>();

        colorCode.add(R.color.col1);
        colorCode.add(R.color.col2);
        colorCode.add(R.color.col3);
        colorCode.add(R.color.col4);
        colorCode.add(R.color.col5);
        colorCode.add(R.color.col6);
        colorCode.add(R.color.col7);
        colorCode.add(R.color.col8);
        colorCode.add(R.color.col9);
        colorCode.add(R.color.col10);
        colorCode.add(R.color.col11);
        colorCode.add(R.color.col12);
        colorCode.add(R.color.col14);
        colorCode.add(R.color.col15);
        colorCode.add(R.color.col16);
        colorCode.add(R.color.col17);
        colorCode.add(R.color.col18);
        colorCode.add(R.color.col19);
        colorCode.add(R.color.col20);

        Random random = new Random();
        return colorCode.get(random.nextInt(colorCode.size()));

    }


    @Override
    public int getItemCount() {
        return events.size();
    }
}


class EventsViewHolder extends RecyclerView.ViewHolder {


    CardView events_container;
    TextView txt_event_title, txt_event_date, txt_event_city;
    ImageView img_event_photo;
    public EventsViewHolder(@NonNull View itemView) {
        super(itemView);
        events_container = itemView.findViewById(R.id.events_container_card);

        txt_event_title = itemView.findViewById(R.id.txt_event_title);
        txt_event_date = itemView.findViewById(R.id.txt_event_date);
        txt_event_city = itemView.findViewById(R.id.txt_event_city);
        img_event_photo = itemView.findViewById(R.id.img_event_photo);

    }
}
