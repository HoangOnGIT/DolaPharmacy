# DolaPharmacy Management System

## Overview

DolaPharmacy is a comprehensive pharmacy management system designed to streamline operations for pharmaceutical retailers. The system provides functionality for inventory management, customer accounts, prescription handling, and order processing through an intuitive web interface.

## Features

- **User Authentication System**: Secure login and registration with JWT tokens
- **Role-Based Access Control**: Different access levels for customers, staff, and administrators
- **Product Management**: Comprehensive catalog with categories, variants, and detailed product information
- **Inventory Tracking**: Real-time stock monitoring with low stock alerts
- **Order Processing**: Complete order lifecycle management from creation to fulfillment
- **Discount Management**: Flexible discount system with various types (fixed, percentage, etc.)
- **Prescription Management**: Handling of prescription medicines with verification
- **Customer Management**: Customer profiles with purchase history and preferences
- **Review System**: Product reviews and ratings

## Technical Stack

- **Frontend**: React.js (assumed based on project structure)
- **Backend**: JSON Server (Mock REST API)
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: JSON file-based storage (db.json)

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd DolaPharmacy
   ```

2. Install dependencies:

   ```bash
   cd json-server
   npm install
   ```

3. Start the JSON server:
   ```bash
   npm start
   ```
   The server will run on http://localhost:3000/api

## API Endpoints

### Authentication

- `POST /api/login` - User login
- `POST /api/register` - User registration
- `POST /api/logout` - User logout

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a product (requires authentication)
- `PUT /api/products/:id` - Update a product (requires authentication)
- `DELETE /api/products/:id` - Delete a product (requires authentication)

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get a specific category
- `POST /api/categories` - Create a category (requires admin)
- `PUT /api/categories/:id` - Update a category (requires admin)
- `DELETE /api/categories/:id` - Delete a category (requires admin)

### Orders

- `GET /api/orders` - Get all orders (requires authentication)
- `GET /api/orders/:id` - Get a specific order (requires authentication)
- `POST /api/orders` - Create an order (requires authentication)
- `PUT /api/orders/:id` - Update an order status (requires authentication)

### Users

- `GET /api/users` - Get all users (requires admin)
- `GET /api/users/:id` - Get a specific user (requires authentication)
- `PUT /api/users/:id` - Update a user (requires authentication)

## Authentication

The system uses JWT (JSON Web Tokens) for authentication. All tokens are stored in the database and verified on protected routes. Token expiration is set to 1 hour by default.

### Token Management

- Tokens are stored in the database
- Expired tokens are automatically cleaned up
- Users can log out to invalidate tokens
- Token validation checks both signature and database status

## Database Structure

The database (db.json) contains the following collections:

- **users**: User accounts with roles and authentication data
- **products**: Complete product catalog with details
- **categories**: Product categorization
- **suppliers**: Product suppliers
- **orders**: Customer orders
- **orderItems**: Individual items in orders
- **discounts**: Promotional offers and discounts
- **tokens**: Active authentication tokens
- **reviews**: Product reviews

## Project Structure

- `/json-server`: Backend server code
  - `main.js`: Server entry point
  - `db.json`: Database file

## Contributing

Please follow the standard Git workflow for contributions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

[MIT License](LICENSE)
