const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const csvParser = require('csv-parser'); // Ensure this line is included and correct

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Serve admin.html directly
app.get('/admin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Serve view-data.html directly
app.get('/view-data.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'view-data.html'));
});

// Save data to CSV
app.post('/save', (req, res) => {
    const { "product name": productName, "user name": userName, quantity, "customer name": customerName, "date and time": dateTime, price } = req.body;
    const csvLine = `"${productName}","${userName}","${quantity}","${customerName}","${dateTime}","${price}"\n`;
    const filePath = path.join(__dirname, 'data', 'oil_data.csv');

    fs.appendFile(filePath, csvLine, (err) => {
        if (err) {
            console.error('Error saving data:', err);
            res.status(500).json({ status: 'error', message: 'Error saving data' });
        } else {
            res.status(200).json({ status: 'success', message: 'Data saved successfully' });
        }
    });
});


// Fetch data from CSV
app.get('/fetch-data', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'oil_data.csv');
    const results = [];

    fs.createReadStream(filePath)
        .pipe(csv(['product name', 'user name', 'quantity', 'customer name', 'date and time', 'price']))
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);
        })
        .on('error', (err) => {
            console.error('Error reading data:', err);
            res.status(500).json({ status: 'error', message: 'Error reading data' });
        });
});



app.listen(PORT, () => {
    console.log(`Admin server running at http://localhost:${PORT}`);
});
