# 🛒 ShopCart - Modern MERN Ecommerce Platform

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)](https://mui.com/)
[![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)

## 🌟 Overview

ShopCart is a modern, full-stack ecommerce platform built with the MERN stack. It features a responsive design, real-time updates, secure authentication, and a comprehensive admin dashboard for sellers.

### ✨ Key Features

- 🛍️ **Multi-vendor marketplace** with seller and customer roles
- 🎨 **Modern UI/UX** with Material-UI components and custom theming
- 🔐 **Secure authentication** with JWT tokens and bcrypt encryption
- 📱 **Responsive design** that works on all devices
- 🛒 **Advanced cart management** with real-time updates
- 📊 **Seller dashboard** with analytics and order management
- 🔍 **Advanced search and filtering** capabilities
- 💳 **Secure payment processing** integration ready
- 📧 **Email notifications** for order updates
- 🌙 **Dark/Light theme** support

## 🚀 Live Demo

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

## 💻 Installation

### Prerequisites

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)
- **MongoDB** (v4.0.0 or higher)

### Quick Setup

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/shopcart-ecommerce.git
cd shopcart-ecommerce
```

2. **Backend Setup:**
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
MONGO_URL=mongodb://localhost:27017/shopcart_ecommerce
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
```

3. **Frontend Setup:**
```bash
cd frontend
npm install
```

Create `.env` file in frontend directory:
```env
REACT_APP_BASE_URL=http://localhost:5000
```

## 🏃‍♂️ Running the Application

### Windows Users (Recommended)
- Double-click `start-backend.bat` to start the backend server
- Double-click `start-frontend.bat` to start the frontend development server

### Manual Start

**Backend Server:**
```bash
cd backend
npm start
```

**Frontend Development Server:**
```bash
cd frontend
npm start
```

## 🗄️ Database Population

Run the database seeding script to populate with sample data:

```bash
cd database
node populateDB.js
```

This will create:
- **52 Products** across 6 categories
- **8 Seller Accounts** with unique shops
- **3 Customer Accounts** for testing

## 🎯 Features

### For Customers
- ✅ **Account Registration & Login**
- ✅ **Browse Products** with advanced filtering
- ✅ **Product Search** with category filters
- ✅ **Shopping Cart** with real-time updates
- ✅ **Secure Checkout** process
- ✅ **Order History** and tracking
- ✅ **User Profile** management
- ✅ **Product Reviews** and ratings

### For Sellers
- ✅ **Seller Dashboard** with analytics
- ✅ **Product Management** (CRUD operations)
- ✅ **Order Management** and fulfillment
- ✅ **Sales Analytics** and reporting
- ✅ **Customer Management**
- ✅ **Inventory Tracking**

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### Frontend
- **React.js** - UI library
- **Material-UI (MUI)** - Component library
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **React Hot Toast** - Notifications
- **Styled Components** - CSS-in-JS

## 📊 Sample Data & Test Accounts

### Customer Accounts
- **Email**: john.doe@email.com, **Password**: password123
- **Email**: jane.smith@email.com, **Password**: password123
- **Email**: mike.johnson@email.com, **Password**: password123

### Seller Accounts
- **Email**: techgear@email.com, **Password**: password123
- **Email**: fashionhub@email.com, **Password**: password123
- **Email**: homeessentials@email.com, **Password**: password123

## 📁 Project Structure

```
shopcart-ecommerce/
├── backend/
│   ├── controllers/          # API route handlers
│   ├── models/              # Database schemas
│   ├── middleware/          # Authentication middleware
│   ├── routes/              # API routes
│   └── utils/               # Helper functions
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── redux/          # State management
│   │   └── theme/          # Material-UI theming
├── database/
│   └── populateDB.js       # Database seeding script
└── README.md
```

## 🔗 API Documentation

### Base URL: `http://localhost:5000/api`

### Authentication Endpoints
- `POST /auth/customer/register` - Register new customer
- `POST /auth/customer/login` - Customer login
- `POST /auth/seller/register` - Register new seller
- `POST /auth/seller/login` - Seller login

### Product Endpoints
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create new product (Seller only)
- `PUT /products/:id` - Update product (Seller only)

## 🚀 Current Status

### ✅ Completed Features
1. **Project Analysis** - Comprehensive understanding of codebase
2. **Local Setup** - MongoDB connection and environment configuration
3. **Database Population** - 52 products across 8 sellers and 6 categories
4. **Backend Enhancement** - Updated models and controllers
5. **Modern UI Components** - Created SimpleNavbar, SimpleHome, SimpleAuth
6. **Theme System** - Material-UI theme with dark/light mode
7. **Redux Integration** - State management for user and product data

### 📍 Current Progress
- **Backend Server**: ✅ Running on port 5000
- **Database**: ✅ Populated with sample data
- **Frontend Components**: ✅ Modern components created
- **Authentication**: ✅ JWT-based system implemented

## 🐛 Troubleshooting

### Common Issues

#### Frontend won't start
- Ensure you're in the correct directory
- Try deleting `node_modules` and running `npm install`
- Check if port 3000 is already in use

#### Backend connection issues
- Verify MongoDB is running
- Check the connection string in `.env`
- Ensure port 5000 is available

#### Network Error during signup
If you encounter network errors, update the base URL in:
```javascript
// In src/redux/userHandle.js
const REACT_APP_BASE_URL = "http://localhost:5000";
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Material-UI** for the amazing component library
- **MongoDB** for the robust database solution
- **React Community** for the excellent ecosystem

