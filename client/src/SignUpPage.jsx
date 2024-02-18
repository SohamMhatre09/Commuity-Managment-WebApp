import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { BASE_URL } from "./config";
import "./index.css";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/user/signup`, {
        username: username,
        password: password,
        city: city,
        phone: phone,
      });

      if (response.status >= 200 && response.status < 300) {
        const data = response.data;
        const token = data.token;
        localStorage.setItem("SavedToken", "Bearer " + token);
        // Optionally, redirect the user to another page upon successful sign-up
        alert("Sign-up successful");
        window.location.href = "/events";
      } else {
        console.error("Sign-up failed:", response.statusText);
        // Provide feedback to the user that the sign-up failed
        alert("Sign-up failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during sign-up:", error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginTop: "5%",
          fontFamily: "Gill Sans, sans-serif",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "20px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          width: "auto",
          opacity: "0.8",
          backgroundColor: "skyblue",
        }}
      >
        <br />
        <div>
          <h1>Sign Up</h1>
        </div>
        <div>Explore Communities and Events</div>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "300px" }}>
            <div style={{ display: "flex", justifyContent: "left" }}>
              <b>Username</b>
            </div>
            <TextField
              id="EnterUsername"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "300px" }}>
            <b style={{ display: "flex", justifyContent: "left" }}>Password</b>
            <TextField
              id="EnterPassword"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "300px" }}>
            <b style={{ display: "flex", justifyContent: "left" }}>City</b>
            <TextField
              id="EnterCity"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "300px" }}>
            <b style={{ display: "flex", justifyContent: "left" }}>
              Phone Number
            </b>
            <TextField
              id="EnterPhoneNumber"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <br />
        <br />
        <Button
          className="signup-signin-button"
          variant="outlined"
          color="primary"
          onClick={handleSignUp}
        >
          Join for Free
        </Button>
        <br />
        <br />
      </div>
    </div>
  );
}

export default SignUpPage;
