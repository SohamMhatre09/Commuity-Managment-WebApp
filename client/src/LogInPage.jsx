import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { BASE_URL } from "./config";
function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Sign-in failed:", errorData.message);
        return;
      }

      const data = await response.json();
      const token = data.token;
      localStorage.setItem("SavedToken", "Bearer " + token);
      window.location.href = "/events";
    } catch (error) {
      console.error("Error during sign-in:", error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontFamily: "Gill Sans, sans-serif",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "20px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          width: "auto",
          opacity: "0.8",
          backgroundColor: "skyblue",
          marginTop: "100px",
        }}
      >
        <h1>Login</h1>
        <br />
        <div style={{ width: "300px" }}>
          <div>
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
        <div style={{ width: "300px" }}>
          <b>Password</b>
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
        <br />
        <Button
          className="signup-signin-button"
          variant="outlined"
          color="primary"
          onClick={handleSignIn}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;
