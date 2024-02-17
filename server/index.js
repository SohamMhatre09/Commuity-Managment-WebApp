const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRouter)

try {
    mongoose.connect('mongodb+srv://eventmanager:eventmanager@eventmanager44.ihhelur.mongodb.net/', {dbName: "EventManager44" });
    console.log('MongoDB connected');
    app.listen(3000, () => console.log('Server running on port 3000'));
}
catch (error) {
    console.log('MongoDB connection failed');
}
