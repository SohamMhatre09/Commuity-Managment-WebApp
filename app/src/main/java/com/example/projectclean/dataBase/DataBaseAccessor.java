package com.example.projectclean.dataBase;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import androidx.annotation.Nullable;

import com.example.projectclean.models.EventModel;

import java.util.ArrayList;
import java.util.List;

public class DataBaseAccessor extends SQLiteOpenHelper {

    // ============================= DB NAME ==============================================
    public static final String DATABASE_NAME = "projectClean.db";

    // ============================= DB NAME ==============================================



    // ============================= EVENT TABLE ==============================================

    private static final String EVENT_TABLE = "event";
    private static final String COL_ROW_NO = "Rowno";
    private static final String COL_EVENT_ID = "eventId";
    private static final String COL_TITLE = "title";
    private static final String COL_DATE = "date";
    private static final String COL_USER_CITY = "city";
    private static final String COL_CITY = COL_USER_CITY;
    private static final String COL_ADDRESS = "address";
    private static final String COL_DESCRIPTION = "description";
    private static final String USER_TABLE = "User";
    private static final String COL_PHONE = "phone";
    private static final String COL_USERNAME = "username";
    private static final String COL_PASSWORD = "password";


    // ============================= EVENT TABLE ==============================================





    // ============================= CONSTRUCTOR ==============================================

    public DataBaseAccessor(@Nullable Context context) {
        super(context, DATABASE_NAME, null, 1);
    }

    // ============================= CONSTRUCTOR ==============================================



    // FIRST TIME ACCESSED CREATE HERE
    @Override
    public void onCreate(SQLiteDatabase db) {

        String createTableEvent = "CREATE TABLE "
                + EVENT_TABLE
                + " ("
                + COL_ROW_NO
                + " INTEGER PRIMARY KEY AUTOINCREMENT, "
                + COL_EVENT_ID
                + " TEXT, "
                + COL_TITLE
                + " TEXT, "
                + COL_DATE
                + " TEXT, "
                + COL_CITY
                + " TEXT, "
                + COL_ADDRESS
                + " TEXT, "
                + COL_DESCRIPTION
                + " TEXT);";


        String createTableUser = "CREATE TABLE "
                + USER_TABLE
                + "("
                + COL_PHONE
                + " TEXT PRIMARY KEY "
                + COL_USERNAME
                + " TEXT,"
                + COL_PASSWORD
                + " TEXT,"
                + COL_USER_CITY
                + " TEXT,"
                +
                ");";

        db.execSQL(createTableEvent);
    }

    @Override
    public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {
    }

    public boolean insertEvent(EventModel event)
    {
        if (event == null) return false;

        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues cv = new ContentValues();

        //TODO: THIS EVENT ID IS GENERATED ALSO PUSH THE OBJ THE CLOUD
        cv.put(COL_EVENT_ID, event.getEventId());
        cv.put(COL_TITLE, event.getTitle());
        cv.put(COL_DATE, event.getDate());
        cv.put(COL_CITY, event.getCity());
        cv.put(COL_ADDRESS, event.getAddress());
        cv.put(COL_DESCRIPTION, event.getDescription());

        long status = db.insert(EVENT_TABLE, null,cv);
        db.close();

        // return true if != -1 i.e success else false
        return status != -1;
    }


    public List<EventModel> getAllEvents()
    {
        SQLiteDatabase db = this.getReadableDatabase();

        List<EventModel> events = new ArrayList<>();
        String queryStr = "SELECT * FROM " + EVENT_TABLE;


        Cursor cursor = db.rawQuery(queryStr, null);

        // get results
        if (cursor.moveToFirst())
        {
            do{
                int row = cursor.getInt(0);
                String eventId = cursor.getString(1);
                String title = cursor.getString(2);
                String date = cursor.getString(3);
                String city = cursor.getString(4);
                String address = cursor.getString(5);
                String desc = cursor.getString(6);

                EventModel event = new EventModel(row,eventId, title, date, city, address ,desc, "");
                events.add(event);

            }while(cursor.moveToNext());
        }

        cursor.close();
        db.close();
        return events;

    }


}
