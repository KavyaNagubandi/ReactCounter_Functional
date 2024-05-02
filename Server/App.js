const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://kavyanagubandi:kavya@crud.nhfvimd.mongodb.net/?retryWrites=true&w=majority&appName=Crud')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define schema for storing email, counter, and myCounter
const emailSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    counter: { type: Number, default: 0 },
    myCounter: { type: Number, default: 0 }
});

// Create a model for the schema
const Email = mongoose.model('Email', emailSchema);

// Routes
// Get all emails along with their counter and myCounter values
app.get('/api/emails', async (req, res) => {
    try {
        const emails = await Email.find();
        res.json(emails);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Increment counter for a specific email
app.post('/api/email/increment/:email', async (req, res) => {
    try {
        const { email } = req.params;
        let foundEmail = await Email.findOne({ email });
        if (!foundEmail) {
            foundEmail = new Email({ email });
        }
        foundEmail.counter++;
        await foundEmail.save();
        res.json(foundEmail);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Increment myCounter for a specific email
app.post('/api/email/incrementMyCount/:email', async (req, res) => {
    try {
        const { email } = req.params;
        let foundEmail = await Email.findOne({ email });
        if (!foundEmail) {
            foundEmail = new Email({ email });
        }
        foundEmail.myCounter++;
        await foundEmail.save();
        res.json(foundEmail);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
