# TechMarket - Used Electronics Marketplace

A full-stack web application for selling used electronics, including non-working items in good condition. Built with Node.js, Express, MongoDB, and modern frontend technologies.

## Features

- **Product Listings**: Sell phones, laptops, earbuds, earphones, and accessories
- **Condition Categories**: Working, Not Working, For Parts
- **Advanced Search & Filtering**: Search by title, category, condition, and price range
- **Image Upload**: Upload up to 5 images per product
- **User Authentication**: Secure registration and login with JWT
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Dynamic product loading and filtering
- **Contact System**: Direct email contact with sellers

## Technology Stack

### Frontend
- HTML5 with semantic markup
- CSS3 with responsive design
- Vanilla JavaScript (ES6+)
- Font Awesome for icons

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Multer for file uploads
- Bcrypt for password hashing

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (installed and running)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd windsurf-project-2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/electronics-marketplace
   JWT_SECRET=your-secret-key-here
   NODE_ENV=development
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system:
   ```bash
   # On Windows
   net start MongoDB

   # On macOS/Linux
   sudo systemctl start mongod
   ```

5. **(Optional) Seed the database with sample data**
   ```bash
   npm run seed
   ```
   This will populate your database with 8 sample products including real images.

6. **Start the application**
   ```bash
   # Development mode with auto-restart
   npm run dev

   # Production mode
   npm start
   ```

7. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Products
- `GET /api/products` - Get all products with filtering and pagination
- `GET /api/products/:id` - Get single product by ID
- `POST /api/products` - Create new product (requires authentication)
- `PUT /api/products/:id` - Update product (requires authentication)
- `DELETE /api/products/:id` - Delete product (requires authentication)

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile (requires authentication)
- `GET /api/users/products` - Get user's products (requires authentication)

### Upload
- `POST /api/upload` - Upload images (max 5 files, 5MB each)

### Stats
- `GET /api/stats` - Get marketplace statistics

## Usage

### For Buyers
1. Browse products on the homepage
2. Use search and filters to find specific items
3. Click on products to view details
4. Contact sellers directly via email

### For Sellers
1. Register for an account
2. Click "Sell Item" to list a product
3. Fill in product details and upload images
4. Manage your listings through your profile

## Project Structure

```
windsurf-project-2/
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── index.html
├── uploads/           # Uploaded product images
├── .env              # Environment variables
├── package.json      # Dependencies and scripts
├── server.js         # Express server
└── README.md         # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For issues and questions, please open an issue on the GitHub repository.

---

**Note**: This application is designed for educational purposes. In a production environment, additional security measures and optimizations would be recommended.
