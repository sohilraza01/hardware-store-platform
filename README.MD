# 🔧 Ahmadi Hardware — Full Stack E-Commerce Platform

A modern, full-featured hardware store e-commerce platform built with React, Node.js, Express, and MongoDB. Includes a complete admin panel, JWT authentication, image uploads, cart system, and order management.

---

## 🌐 Live Demo

 URL |  https://ahmadi-hardware.vercel.app

---

## ✨ Features

### Customer Features
- 🛍️ Browse all products with search & category filters
- 🔍 Real-time product search by name, brand, or description
- 🛒 Add to cart with quantity management
- 📦 Place orders with Cash on Delivery (COD)
- 👤 User registration & login with JWT authentication
- 📋 View personal order history & status tracking

### Admin Features
- 📊 Dashboard with sales stats & recent orders overview
- ➕ Add, edit & delete products with image upload
- 📦 Manage & update order statuses in real-time
- 👥 View and manage all registered users
- 🖼️ Local image upload system (up to 5MB per image)

### Technical Features
- 🔐 JWT-based authentication with role-based access control
- 🛡️ Password encryption with bcryptjs
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⚡ Fast page transitions with Framer Motion animations


---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + TypeScript | Core framework |
| Vite | Build tool & dev server |
| Wouter | Client-side routing |
| TanStack Query | Server state management & caching |
| Tailwind CSS v4 | Styling |
| Shadcn/UI + Radix UI | UI component library |
| Framer Motion | Animations & page transitions |
| React Hook Form + Zod | Form handling & validation |
| Sonner | Toast notifications |
| Lucide React | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | Server framework |
| TypeScript | Type safety |
| MongoDB + Mongoose | Database & ODM |
| JWT (jsonwebtoken) | Authentication tokens |
| bcryptjs | Password hashing |
| Multer | File/image upload handling |
| CORS | Cross-origin resource sharing |
| dotenv | Environment variable management |
| Nodemon + ts-node | Development hot reload |


---

## 🚀 Getting Started — Local Setup


### 1. Clone the Repository

```bash
git clone https://github.com/sohilraza01/hardware-store-platform.git
cd hardware-store-platform
```

---

### 2. Backend Setup

```bash
# Navigate to backend directory
cd server

# Install dependencies
npm install
```

Create a `.env` file in the `backend` folder:

```env
PORT
MONGO_URI
JWT_SECRET
NODE_ENV
```

Start the development server:

```bash
npm run dev
```

✅ Backend will run on: `http://localhost:5000`

---

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
```

Create a `.env` file in the `frontend` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

✅ Frontend will run on: `http://localhost:5173`

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login & get JWT token |
| GET | `/api/auth/profile` | Private | Get logged-in user profile |


### Orders

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/orders` | Private | Place a new order |
| GET | `/api/orders/my` | Private | Get logged-in user's orders |
| GET | `/api/orders/:id` | Private | Get single order by ID |
| GET | `/api/orders` | Admin | Get all orders |
| PUT | `/api/orders/:id/status` | Admin | Update order status |

### Admin

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/admin/stats` | Admin | Get dashboard statistics |
| GET | `/api/admin/users` | Admin | Get all users |
| DELETE | `/api/admin/users/:id` | Admin | Delete a user |
| PUT | `/api/admin/users/:id/role` | Admin | Update user role |

### Upload

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/upload` | Admin | Upload a product image |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch:
3. Make your changes and commit:
4. Push to the branch:
5. Open a Pull Request

---