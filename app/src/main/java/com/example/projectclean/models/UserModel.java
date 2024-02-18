package com.example.projectclean.models;

import java.io.Serializable;
import java.util.List;

public class UserModel implements Serializable {
    private String username = "";
    private String password = "";
    private String city = "";
    private String phone = "";

    private List<String> joinedEventIds;
    private List<String> createdEventIds;

    public UserModel(String username, String password, String city, String phone, List<String> joinedEventIds, List<String> createdEventIds) {
        this.username = username;
        this.password = password;
        this.city = city;
        this.phone = phone;
        this.joinedEventIds = joinedEventIds;
        this.createdEventIds = createdEventIds;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<String> getJoinedEventIds() {
        return joinedEventIds;
    }

    public void setJoinedEventIds(List<String> joinedEventIds) {
        this.joinedEventIds = joinedEventIds;
    }

    public List<String> getCreatedEventIds() {
        return createdEventIds;
    }

    public void setCreatedEventIds(List<String> createdEventIds) {
        this.createdEventIds = createdEventIds;
    }
}
