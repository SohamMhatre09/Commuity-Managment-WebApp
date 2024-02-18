import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "./config";
function ResponsiveAppBar() {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/user/me`, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("SavedToken"),
          },
        });

        if (response.status === 403) {
          console.error(
            "Forbidden: You don't have permission to access this resource."
          );
          return;
        }

        if (response.ok) {
          const data = await response.json();
          if (data.username) {
            setEmail(data.username);
          }
        } else {
          console.error("Failed to fetch user data. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        padding: "0px",
        margin: "0px",
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "left",
          padding: "0.2%", // Decrease the padding
          backgroundColor: "#A9E5EB", // Set background color
          color: "white",
        }}
      >
        
        {email ? (
          <>
            <h3
              style={{
                marginTop: "1.5%",
              }}
            >
              Hi, {email} !!
            </h3>
            <Link
              to="/adminlogin"
              style={{
                marginRight: "15px",
                textDecoration: "none",
                color: "white",
                padding: "1.5% 2%",
              }}
              onClick={() => {
                localStorage.removeItem("SavedToken");
                window.location.href = "/";
              }}
            >
              <h3>Log Out</h3>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                marginRight: "15px",
                textDecoration: "none",
                color: "white",
                padding: "1.5% 2%",
              }}
            >
              <h3>Login</h3>
            </Link>
            <Link
              to="/signup"
              style={{
                marginRight: "15px",
                textDecoration: "none",
                color: "white",
                padding: "1.5% 2%",
              }}
            >
              <h3>Sign up</h3>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default ResponsiveAppBar;
