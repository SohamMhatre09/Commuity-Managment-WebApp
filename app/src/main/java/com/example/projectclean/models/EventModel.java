package com.example.projectclean.models;

import java.io.Serializable;
public class EventModel implements Serializable {

    public EventModel(int row, String eventId, String title, String date, String city, String address, String description, String img_url) {
        this.row = row;
        this.eventId = eventId;
        this.title = title;
        this.date = date;
        this.city = city;
        this.address = address;
        this.description = description;
        this.img_url = img_url;
    }

    int row = 0;
    String eventId = "";

    String title = "";

    String date = "";

    String city = "";

    String address = "";

    String description = "";

    String img_url = "";

    public String getImg_url() {
        return img_url;
    }

    public void setImg_url(String img_url) {
        this.img_url = img_url;
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public int getRow() {
        return row;
    }

    public void setRow(int row) {
        this.row = row;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    @Override
    public String toString() {
        return "EventModel{" +
                "row=" + row +
                ", eventId='" + eventId + '\'' +
                ", title='" + title + '\'' +
                ", date='" + date + '\'' +
                ", city='" + city + '\'' +
                ", address='" + address + '\'' +
                ", description='" + description + '\'' +
                ", img_url='" + img_url + '\'' +
                '}';
    }
}
