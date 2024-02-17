const express = require('express');
const { User, Event, AllEvents } = require("../db");
const {authenticateJwt,
  SECRET,jwt} = require("../middleware/auth");
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password, city, phone} = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: 'User already exists' });
  } else {
    const newUser = new User({ username, password, city, phone });
    await newUser.save();
    const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'User created successfully', token });
  }
});

// create the routes for user for login
router.post('/login',async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne ({ username });
  if (user) {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

router.get("/me", authenticateJwt, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(403).json({ msg: "User not found" });
    }
    res.json({
      username: user.username
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving user' });
  }
});
router.post('/events', authenticateJwt, async (req, res) => {
  const eventData = req.body;
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    eventData.createdBy = user._id;
    const newEvent = new Event(eventData);
    await newEvent.save();
    // Update user's created events
    user.createdEvents.push(newEvent._id);
    await user.save();
    res.status(200).json({ message: 'Event created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating event' });
  }
});


// Get all events
router.get('/events', authenticateJwt, async (req, res) => {
  try {
    const events = await Event.find({});
    res.json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving events' });
  }
});

// Get a specific event by ID
router.get('/events/:eventId', authenticateJwt, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving event' });
  }
});

// Create a new event


// Update an event by ID
router.put('/events/:eventId', authenticateJwt, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.eventId, req.body, { new: true });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating event' });
  }
});

// Delete an event by ID
router.delete('/events/:eventId', authenticateJwt, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    // Check if the user is authorized to delete the event
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to delete this event' });
    }
    await event.deleteOne();
    // Remove event from user's created events
    const user = await User.findById(req.user._id);
    user.createdEvents.pull(req.params.eventId);
    await user.save();
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting event' });
  }
});
module.exports = router;
