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
  }) => {
    const query = new URLSearchParams(params as any).toString();
    return request(`/products?${query}`);
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