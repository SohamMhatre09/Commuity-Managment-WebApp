const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require("./routes/user");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRouter)
app.get('/', (req, res) => {
    res.send("Welcome To API for GFG Hackathon");
});
try {
    mongoose.connect('mongodb+srv://eventmanager:eventmanager@eventmanager44.ihhelur.mongodb.net/', {dbName: "EventManager44" });
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log('Server running on port 3000'));
}
catch (error) {
    console.log('MongoDB connection failed');
}
