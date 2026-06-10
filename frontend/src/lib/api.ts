const API_URL = 'http://localhost:5000/api';

// Token localStorage se lao
const getToken = () => localStorage.getItem('token');

// Base fetch function
const request = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Kuch gadbad ho gayi!');
  }

  return data;
};

// ─── Auth APIs ───────────────────────────────
export const authApi = {
  register: (body: { name: string; email: string; password: string; phone?: string }) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),

  login: (body: { email: string; password: string }) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),

  getProfile: () => request('/auth/profile'),
};

// ─── Product APIs ─────────────────────────────
export const productApi = {
getAll: (params?: {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}) => {
  const query = new URLSearchParams();
  if (params?.search) query.append('search', params.search);
  if (params?.category) query.append('category', params.category);
  if (params?.minPrice) query.append('minPrice', String(params.minPrice));
  if (params?.maxPrice) query.append('maxPrice', String(params.maxPrice));
  if (params?.page) query.append('page', String(params.page));
  if (params?.limit) query.append('limit', String(params.limit));
  
  return request(`/products?${query.toString()}`);
},
  getById: (id: string) => request(`/products/${id}`),

  getFeatured: () => request('/products/featured'),

  create: (body: any) =>
    request('/products', { method: 'POST', body: JSON.stringify(body) }),

  update: (id: string, body: any) =>
    request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(body) }),

  delete: (id: string) =>
    request(`/products/${id}`, { method: 'DELETE' }),
};

// ─── Order APIs ───────────────────────────────
export const orderApi = {
  create: (body: any) =>
    request('/orders', { method: 'POST', body: JSON.stringify(body) }),

  getMyOrders: () => request('/orders/my'),

  getById: (id: string) => request(`/orders/${id}`),

  // Admin
  getAll: () => request('/orders'),

  updateStatus: (id: string, status: string) =>
    request(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
};

// Admin APIs
export const adminApi = {
  getStats: () => request('/admin/stats'),

  // Users
  getUsers: () => request('/admin/users'),
  deleteUser: (id: string) => request(`/admin/users/${id}`, { method: 'DELETE' }),
  updateUserRole: (id: string, role: string) =>
    request(`/admin/users/${id}/role`, { method: 'PUT', body: JSON.stringify({ role }) }),

  // Products
  getProducts: (params?: any) => {
    const query = new URLSearchParams(params).toString();
    return request(`/admin/products?${query}`);
  },
  createProduct: (body: any) =>
    request('/admin/products', { method: 'POST', body: JSON.stringify(body) }),
  updateProduct: (id: string, body: any) =>
    request(`/admin/products/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteProduct: (id: string) =>
    request(`/admin/products/${id}`, { method: 'DELETE' }),

  // Orders
  getOrders: () => request('/admin/orders'),
  updateOrderStatus: (id: string, status: string) =>
    request(`/admin/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
};

// Image upload — FormData use karta hai, JSON nahi
export const uploadImage = async (file: File): Promise<string> => {
  const token = getToken();
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    headers: {
      // Content-Type mat likho — browser khud set karta hai FormData ke liye
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Upload fail ho gaya!');

  // Full URL return karo
  return `http://localhost:5000${data.imageUrl}`;
};