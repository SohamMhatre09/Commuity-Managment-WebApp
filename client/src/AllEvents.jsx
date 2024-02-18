import { useState, useEffect } from "react";
import EventCard from "./EventCard";
import { BASE_URL } from "./config";

export default function AllEvents() {
  const [events, setEvents] = useState([]);
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

        if (!response.ok) {
          console.error(`HTTP error! Status: ${response.status}`);
          return;
        }

        const data = await response.json();

        if (isMounted) {
          setEvents(data.events);
          setIsLoading(false);
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
        <h1
          style={{
            marginLeft: "42%",
          }}
        >
          Create your event !!
        </h1>
        <button
          className="signup-signin-button"
          style={{
            margin: "20px 44%",
          }}
          onClick={() => (window.location.href = "/createyourevent")}
        >
          Create Event
        </button>
      </div>
      {isLoading ? ( // Conditional rendering for loading message
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "80px",
          }}
        >
          Loading...
        </p>

      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            justifyContent: "center",
            marginLeft: "4%",
            // gap: "20px",
          }}
        >
          {events.map((event) => (
            <EventCard
              key={event._id}
              id={event._id}
              eventName={event.name}
              date={event.date}
              location={event.location}
              imageLink={event.imageLink}
            />
          ))}
        </div>
      )}
    </div>
  );
}
