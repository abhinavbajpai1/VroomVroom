# VroomVroom - Bike Rental System

A comprehensive bike rental management system built with React.js frontend and Node.js backend.

## 🚀 Features

### User Management
- User registration and authentication
- Profile management with photo upload
- JWT-based authentication
- Password management

### Dashboard
- **Overview Tab**: Statistics and recent activity
- **Rentals Tab**: Complete rental history with due dates
- **Profile Tab**: User profile management and photo upload

### Bike Management
- Available bikes listing
- Bike details and specifications
- Rental status tracking
- Due date monitoring

### Rental System
- Rental history tracking
- Due date notifications
- Overdue rental highlighting
- Cost tracking

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File uploads
- **Cloudinary** - Image storage

## 📁 Project Structure

```
VroomVroom/
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Home.jsx
│   │   ├── Authentication/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   └── App.jsx
│   └── package.json
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── user.controller.js
│   │   │   └── bike.controller.js
│   │   ├── models/
│   │   │   ├── customer.model.js
│   │   │   ├── bike.model.js
│   │   │   └── rental.model.js
│   │   ├── routes/
│   │   │   ├── auth.router.js
│   │   │   ├── user.router.js
│   │   │   └── bike.router.js
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   └── multer.middleware.js
│   │   └── utils/
│   │       └── Cloudinary.js
│   └── index.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd VroomVroom
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd Frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../Backend
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the Backend directory:
   ```env
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

5. **Start the Backend Server**
   ```bash
   cd Backend
   npm start
   ```

6. **Start the Frontend Development Server**
   ```bash
   cd Frontend
   npm run dev
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile/me` - Get current user profile

### User Management
- `GET /api/user/profile/:userId` - Get user profile
- `PUT /api/user/profile/:userId` - Update user profile
- `POST /api/user/upload-profile/:userId` - Upload profile picture
- `PUT /api/user/change-password/:userId` - Change password

### Rental Management
- `GET /api/user/rentals/:userId` - Get user rental history
- `GET /api/user/stats/:userId` - Get dashboard statistics

### Bike Management
- `GET /api/bikes/available` - Get available bikes
- `GET /api/bikes/:bikeId` - Get bike details
- `GET /api/bikes` - Get all bikes (protected)
- `POST /api/bikes` - Create new bike (protected)
- `PUT /api/bikes/:bikeId/availability` - Update bike availability (protected)

## 🎯 Key Features

### Dashboard Overview
- Total rentals count
- Active rentals tracking
- Overdue rentals monitoring
- Recent activity feed

### Rental History
- Complete rental timeline
- Due date tracking
- Status indicators (active, completed, overdue)
- Cost breakdown

### Profile Management
- Profile picture upload with Cloudinary
- Personal information management
- Address and contact details
- Password change functionality

### Bike Catalog
- Available bikes listing
- Detailed bike information
- Pricing and specifications
- Rental availability status

## 🔐 Security Features

- JWT-based authentication
- Protected API routes
- Password validation
- File upload security
- CORS configuration

## 🎨 UI/UX Features

- Responsive design
- Modern, clean interface
- Loading states
- Error handling
- Tabbed navigation
- Real-time updates

## 🚀 Deployment

### Frontend Deployment
```bash
cd Frontend
npm run build
```

### Backend Deployment
```bash
cd Backend
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- **VroomVroom Team**

## 🙏 Acknowledgments

- React.js community
- Tailwind CSS team
- MongoDB documentation
- Express.js framework 