import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventCard from "./EventCard"; // Assuming EventCard is the component to display event details
import { BASE_URL } from "./config";

export default function SpecificCourse() {
  const { eventid } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        console.log("Fetching event with ID:", eventid); // Add console log to debug
        const response = await fetch(`${BASE_URL}/user/events/${eventid}`, {
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

        const eventData = await response.json();
        setEvent(eventData.event); // Set the fetched event data to state
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchEvent();
  }, [eventid]);

  return (
    <div>
      {event && ( // Render EventCard if event data is available
        <EventCard
          id={event._id}
          eventName={event.name}
          date={event.date}
          location={event.location}
          imageLink={event.imageLink}
          community={event.community}
          impactDescription={event.impactDescription}
        />
      )}
    </div>
  );
}
