const Event = require("../models/Event");

exports.addEvent = async (req, res) => {
    try {
        const { title, date, location, description } = req.body;

        let imageUrl = "";
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        const newEvent = new Event({
            title,
            date,
            location,
            description,
            imageUrl
        });

        await newEvent.save();

        res.json({ message: "Event added successfully!", event: newEvent });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding event" });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: "Error fetching events" });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: "Event deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting event" });
    }
};
