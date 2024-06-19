# Inventory-Management-System

This project is a simple Oil Management System that allows users to log in, add data about oil products, and view the stored data. It features separate interfaces for admin and regular users. Admins have additional functionality to view the data stored in a CSV file.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Authentication**: Login as admin or user.
- **Add Data**: Users can add data including product name, quantity, customer name, date and time, and price.
- **View Data**: Admins can view all the data stored in the system.
- **Responsive Design**: The interface is responsive and user-friendly.

## Technologies Used
- HTML, CSS, JavaScript for the frontend
- Node.js and Express for the backend
- CSV file for data storage

## Setup and Installation
Follow these steps to set up the project locally:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/inventory-management-system.git
    cd inventory-management-system
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the server**:
    ```bash
    node index.js
    ```

4. **Open the application in your browser**:
    Go to `http://localhost:3000` in your web browser.

## Usage
1. **Login**:
    - Go to the login page and select either `admin` or `user` from the dropdown menu.
    - Enter the password (`1` for admin, `2` for user).

2. **Admin Interface**:
    - After logging in as admin, you can either view data or add data.
    - Viewing data shows the stored records in a table format.
    - Adding data allows you to input new oil product details.

3. **User Interface**:
    - Users can add data about oil products.


## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
