import { useState, useEffect } from "react";
import EventCard from "./EventCard";
import { BASE_URL } from "./config";

export default function YourEvents() {
  const [events, setEvents] = useState([]);
  const [user_idd, setUser_idd] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  useEffect(() => {
    let isMounted = true;
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${BASE_URL}/user/events`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("SavedToken"),
          },
        });

        const response2 = await fetch(`${BASE_URL}/user/me`, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("SavedToken"),
          },
        });

        if (!response.ok || !response2.ok) {
          console.error("HTTP error during fetch");
          return;
        }

        const data = await response.json();
        const data2 = await response2.json();

        if (isMounted) {
          setEvents(data.events);
          setIsLoading(false);
          setUser_idd(data2._id);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <div
        style={{
          display: "block",
          justifyContent: "center",
          padding: "2%",
          color: "black",
        }}
      >
        <h1 style={{ marginLeft: "40%" }}>Your Events</h1>
        
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            justifyContent: "center",
          }}
        >
          {events.map((event) =>
            // Check if the event's createdBy field matches the user's ID
            event.createdBy == user_idd ? (
              <EventCard
                key={event._id}
                id={event._id}
                eventName={event.name}
                date={event.date}
                location={event.location}
                imageLink={event.imageLink}
              />
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
