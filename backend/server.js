const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use the cors middleware
app.use(cors());

// Path to the JSON file where data will be stored
const filePath = path.join(__dirname, 'data.json');

// Endpoint to receive data
app.post('/submit', (req, res) => {
    const data = req.body; // Get the data sent from the frontend
    console.log("Received data:", data); // Log the received data

    // Append the received data to a JSON file
    fs.readFile(filePath, (err, fileData) => {
        let jsonData = [];
        if (!err) {
            try {
                jsonData = JSON.parse(fileData); // Parse existing data
            } catch (parseError) {
                console.error("Error parsing JSON data:", parseError);
            }
        }
        jsonData.push(data); // Add new data

        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error("Error writing to file:", err);
                return res.status(500).json({ message: "Error saving data." });
            }
            res.status(200).json({ message: "Data received successfully!", data: data });
        });
    });
});

// Route for root URL
app.get('/', (req, res) => {
    // Read the data from the JSON file and send the last element as a response
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).json({ message: "Error reading data." });
        }
        let jsonData = [];
        try {
            jsonData = JSON.parse(fileData); // Parse existing data
        } catch (parseError) {
            console.error("Error parsing JSON data:", parseError);
            return res.status(500).json({ message: "Error parsing data." });
        }
        // Respond with the last element of the data array, if it exists
        if (jsonData.length > 0) {
            res.json(jsonData[jsonData.length - 1]); // Send the most recent data
        } else {
            res.json({ message: "No data received yet." }); // Default message if no data is present
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});