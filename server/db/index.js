const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    city: String,
    phone: Number,
    joinedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    createdEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
});

const eventSchema = new mongoose.Schema({
    name: { type: String },
    date: String,
    location: String,
    description: String,
    imageLink: String,
    community: {
        type: String,
        enum: [
            "River Cleaning",
            "Beach Conservation",
            "Tree Planting",
            "Wildlife Habitat Restoration",
            "Social Welfare",
            "Health and Wellness",
            "Community Development",
            "Animal Welfare",
            "others"
        ],
        default: "others" // Set a default value if none provided
    },
    customTypeOfEvent:String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    eventCompletion:Boolean,
    impactImageslink: [String],
    impactDescription: String,

    joinedUsers:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    
});

const allEventsSchema = new mongoose.Schema({
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const User = mongoose.model('User', userSchema);
const Event = mongoose.model('Event', eventSchema);
const AllEvents = mongoose.model('AllEvents', allEventsSchema);

module.exports = {
    User,
    Event,
    AllEvents
};