import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { BASE_URL } from "./config";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export default function CreateYourEvent() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [community, setCommunity] = useState("");
  const [impactDescription, setImpactDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/user/events`,
        {
          name: name,
          date: date,
          location: location,
          description: description,
          imageLink: imageLink,
          community: community,
          impactDescription: impactDescription,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("SavedToken"),
          },
        }
      );

      response.status >= 200 && response.status < 300
        ? alert("Event created successfully")
        : alert("Event creation failed");
      window.location.href = "/events";
    } catch (error) {
      console.error("Error creating event:", error.message);
    }
  };

  return (
    <div>
      <h1
        style={{
          marginLeft: "45%",
          paddingTop: "2%",
        }}
      >
        Create Your Event
      </h1>
      <div
        style={{
          marginLeft: "42%",
          marginTop: "1%",
          padding: "2%",
          width: "300px",
          backgroundColor: "#A9E5EB",
          opacity: "0.8",
          borderRadius: "5px",
        }}
      >
        <TextField
          id="name"
          label="Event Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          id="date"
          label="Date"
          variant="outlined"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          margin="normal"
        />
        <TextField
          id="location"
          label="Location"
          variant="outlined"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          margin="normal"
        />
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <TextField
          id="imageLink"
          label="Image Link"
          variant="outlined"
          fullWidth
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
          margin="normal"
        />
        {/* <select id="cars" name="cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select> */}
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="community-label">Community</InputLabel>
          <Select
            labelId="community-label"
            id="community"
            value={community}
            onChange={(e) => setCommunity(e.target.value)}
            label="Community"
          >
            <MenuItem value="River Cleaning">River Cleaning</MenuItem>
            <MenuItem value="Beach Conservation">Beach Conservation</MenuItem>
            <MenuItem value="Tree Planting">Tree Planting</MenuItem>
            <MenuItem value="Wildlife Habitat Restoration">
              Wildlife Habitat Restoration
            </MenuItem>
            <MenuItem value="Social Welfare">Social Welfare</MenuItem>
            <MenuItem value="Health and Wellness">Health and Wellness</MenuItem>
            <MenuItem value="Community Development">
              Community Development
            </MenuItem>
            <MenuItem value="Animal Welfare">Animal Welfare</MenuItem>
            <MenuItem value="others">others</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="impactDescription"
          label="Impact Description"
          variant="outlined"
          fullWidth
          value={impactDescription}
          onChange={(e) => setImpactDescription(e.target.value)}
          margin="normal"
        />
        <Button
          style={{
            marginTop: "20px",
            marginLeft: "25%",
          }}
          className="signup-signin-button"
          type="submit"
          variant="outlined"
          color="primary"
          onClick={handleSubmit}
        >
          Create Event
        </Button>
      </div>
    </div>
  );
}
