
const jwt = require('jsonwebtoken');
const express = require('express');

const { authenticateJwt, SECRET } = require("../middleware/auth");
const { User, Event, AllEvents } = require("../db");
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
router.post('/events', authenticateJwt, async (req, res) => {
  const eventData = req.body;
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const existingEvent = await Event.findOne({ createdBy: user._id, name: eventData.name });
    if (existingEvent) {
      return res.status(400).json({ message: 'Event with the same title already exists for this user' });
    }

    eventData.createdBy = user._id;
    const newEvent = new Event(eventData);
    await newEvent.save();
    // Update user's created events
    user.createdEvents.push(newEvent._id);
    await user.save();
    // add the event in all events ( it does not matter how may events he creates all shall be added in all events )
    const allEvents = await AllEvents.findOne({ createdBy: user._id });
    if (!allEvents) {
      const newAllEvents = new AllEvents({ createdBy: user._id });
      newAllEvents.events.push(newEvent._id);
      await newAllEvents.save();
    } else {
      allEvents.events.push(newEvent._id)
      await allEvents.save();
    }
    res.status(200).json({ message: 'Event created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating event' });
  }
});


// Update an event by ID
router.put('/events/:eventId', authenticateJwt, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Check if the user updating the event is the creator of the event
    if (event.createdBy.equals(user._id)) {
      const eventData = req.body;
      event.name = eventData.name;
      event.location = eventData.location;
      // event.date = eventData.date;
      event.description = eventData.description;
      event.imageLink = eventData.imageLink;
      event.community = eventData.community;
      event.save();
      res.json({ message: 'Event updated successfully' });
    } else {
      // User is not authorized to update this event
      return res.status(403).json({ message: 'Unauthorized to update this event' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating event' });
  }
});
// Delete an event by ID
router.delete('/events/:eventId', authenticateJwt, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    const user1 = await User.findOne({ username: req.user.username });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    console.log(event.createdBy, user1._id);
    if (event.createdBy.equals(user1._id)){
      await event.deleteOne();
    // Remove event from user's created events
    const user = await User.findById(user1._id);
    user.createdEvents.pull(req.params.eventId);
    await user.save(); // Save the user document after modifying the array

    res.status(200).json({ message: 'Event deleted successfully' });
  }
  else{
    return res.status(403).json({ message: 'Unauthorized to delete this event' });
  } }
  
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting event' });
  }

});



module.exports = router;
