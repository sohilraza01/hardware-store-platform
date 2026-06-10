import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware';
import { getDashboardStats, getAllUsers, deleteUser, updateUserRole } from '../controllers/adminController';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController';
import { getAllOrders, updateOrderStatus } from '../controllers/orderController';

const router = express.Router();

// Sab routes admin only hain
router.use(protect, adminOnly);

// Dashboard
router.get('/stats', getDashboardStats);

// Users
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/role', updateUserRole);

// Products (admin ke liye alag route)
router.get('/products', getProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Orders
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);

export default router;