export default function LandingPage() {
  return (
    <div>
      <div
        style={{
          padding: "2%",
          color: "black",
          marginLeft: "30%",
          width: "1050px"
        }}
      >
        <h1
          style={{
            fontSize: "100px",
            fontWeight: "bold",
            fontStyle: "italic",
            backgroundColor: "#83C0C1",
          }}
        >
          Welcome to Commute !!
        </h1>
      </div>
      <div
        style={{
          padding: "2%",
          color: "black",
          marginLeft: "30%",
        }}
      >
        <p
          style={{
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          This is a platform where you can create events and join events.
          <br />
          You can also see the events you have created and the events you have
          joined.
        </p>
      </div>
    </div>
  );
}
