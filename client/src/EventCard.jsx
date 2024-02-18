import { Card, Button } from "@mui/material";

export default function CourseCard(props) {
  return (
    <Card
      style={{
        width: "300px",
        height: "300px",
        marginLeft: "10px",
        marginRight: "10px",
        marginBottom: "70px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        opacity: "0.7",
        borderRadius: "10%",
      }}
    >
      <h2>{props.eventName}</h2>
      <p>{props.courseDescription}</p>
      <img
        style={{
          width: "60%",
          height: "60%",
          borderRadius: "10%",
          objectFit: "cover",
        }}
        src={props.courseImage}
        alt="SampleImg"
      />
      <Button>
        <a href={`/user/event/${props.id}`}>View Event</a>
      </Button>
    </Card>
  );
}
