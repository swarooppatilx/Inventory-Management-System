const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { "product name": productName, "user name": userName, quantity, "customer name": customerName, "date and time": dateTime, price } = req.body;
        const csvLine = `"${productName}","${userName}","${quantity}","${customerName}","${dateTime}","${price}"\n`;
        const filePath = path.join(process.cwd(), 'data', 'oil_data.csv');

        fs.appendFile(filePath, csvLine, (err) => {
            if (err) {
                console.error('Error saving data:', err);
                res.status(500).json({ status: 'error', message: 'Error saving data' });
            } else {
                res.status(200).json({ status: 'success', message: 'Data saved successfully' });
            }
        });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
