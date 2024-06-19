const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
    const filePath = path.join(process.cwd(), 'data', 'oil_data.csv');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data:', err);
            res.status(500).json({ status: 'error', message: 'Error reading data' });
        } else {
            res.status(200).json({ status: 'success', data });
        }
    });
}
