import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi, uploadImage } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from 'wouter';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Package, ShoppingBag, Users,
  Plus, Pencil, Trash2, Loader2, X,
  Clock, IndianRupee, ImageIcon
} from 'lucide-react';

// ─── Product Form Schema ───────────────────────────────
const productSchema = z.object({
  name: z.string().min(2, 'Naam likho'),
  description: z.string().min(10, 'Description likho'),
  price: z.string().min(1, 'Price likho'),
  category: z.string().min(1, 'Category chuno'),
  brand: z.string().min(1, 'Brand likho'),
  stock: z.string().min(1, 'Stock likho'),
  images: z.string().optional(),
});
type ProductForm = z.infer<typeof productSchema>;

// ─── Stat Card ────────────────────────────────────────
function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-border bg-background p-6 flex items-center gap-4"
    >
      <div className={`p-3 rounded-none ${color}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-black">{value}</p>
      </div>
    </motion.div>
  );
}

// ─── Product Modal ────────────────────────────────────

function ProductModal({ product, onClose, onSave }: any) {
  const [imageUrl, setImageUrl] = useState(product?.images?.[0] || '');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: product ? {
      name: product.name,
      description: product.description,
      price: String(product.price),
      category: product.category,
      brand: product.brand,
      stock: String(product.stock),
    } : {},
  });

  // Image select hone pe upload karo
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadImage(file);
      setImageUrl(url);
      toast.success('Image uploaded successfully! ✅',{
        position: "top-left",
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to image upload!',{
        position: "top-left",
      });
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (data: ProductForm) => {
    onSave({
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
      images: imageUrl ? [imageUrl] : [],
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-background border border-border w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-black uppercase tracking-tight">
            {product ? 'Product Update Karo' : 'Naya Product Add Karo'}
          </h2>
          <button onClick={onClose} className="hover:text-primary transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Product Image</label>

            {/* Image Preview */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer rounded-none overflow-hidden"
            >
              {imageUrl ? (
                <div className="relative group">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-sm font-bold">Click to Change</p>
                  </div>
                </div>
              ) : (
                <div className="h-48 flex flex-col items-center justify-center gap-3 text-muted-foreground">
                  {uploading ? (
                    <>
                      <Loader2 size={32} className="animate-spin text-primary" />
                      <p className="text-sm">Uploading...</p>
                    </>
                  ) : (
                    <>
                      <ImageIcon size={32} className="opacity-40" />
                      <p className="text-sm">Click to upload image</p>
                      <p className="text-xs opacity-60">JPG, PNG, WebP — max 20MB</p>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageChange}
              className="hidden"
            />

            {uploading && (
              <p className="text-xs text-primary mt-1 flex items-center gap-1">
                <Loader2 size={12} className="animate-spin" />
                Uploading...
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Product Name *</label>
            <Input {...register('name')} placeholder="Stanley Hammer" className="rounded-none" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea
              {...register('description')}
              placeholder="Product detail..."
              rows={3}
              className="w-full border border-input rounded-none px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none bg-background"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price (₹) *</label>
              <Input {...register('price')} type="number" placeholder="450" className="rounded-none" />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stock *</label>
              <Input {...register('stock')} type="number" placeholder="50" className="rounded-none" />
              {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category *</label>
              <select
                {...register('category')}
                className="w-full border border-input rounded-none px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background"
              >
                <option value="">Select Category</option>
                {['Tools', 'Electrical', 'Plumbing', 'Safety', 'Paints', 'Fasteners', 'Other'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Brand *</label>
              <Input {...register('brand')} placeholder="Stanley" className="rounded-none" />
              {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand.message}</p>}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              disabled={uploading}
              className="flex-1 rounded-none font-bold uppercase"
            >
              {product ? 'Do Update' : 'Do Add'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="rounded-none">
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ─── Main Admin Panel ─────────────────────────────────
export default function AdminPanel() {
  const { isAdmin } = useAuth();
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'users'>('dashboard');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Agar admin nahi hai toh redirect karo
  if (!isAdmin) {
    navigate('/');
    return null;
  }

  // Queries
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: adminApi.getStats,
    enabled: activeTab === 'dashboard',
  });

  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: () => adminApi.getProducts(),
    enabled: activeTab === 'products',
  });

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: adminApi.getOrders,
    enabled: activeTab === 'orders',
  });

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: adminApi.getUsers,
    enabled: activeTab === 'users',
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: adminApi.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast.success('Product added successfully! ✅',{
        position:'top-left'
      });
      setShowProductModal(false);
    },
    onError: (err: any) => toast.error(err.message ,{
        position:'top-left'
      }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: any) => adminApi.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast.success('Product updated successfully! ✅',{
        position:'top-left'
      });
      setShowProductModal(false);
      setEditingProduct(null);
    },
    onError: (err: any) => toast.error(err.message,{
        position:'top-left'
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: adminApi.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast.success('Product deleted successfully!',{
        position:'top-left'
      });
    },
    onError: (err: any) => toast.error(err.message,{
        position:'top-left'
      }),
  });

  const orderStatusMutation = useMutation({
    mutationFn: ({ id, status }: any) => adminApi.updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      toast.success('Order status updated successfully! ✅',{
        position:'top-left'
      });
    },
    onError: (err: any) => toast.error(err.message,{
        position:'top-left'
      }),
  });

  const deleteUserMutation = useMutation({
    mutationFn: adminApi.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('User deleted!',{
        position:'top-left'
      });
    },
  });

  const handleSaveProduct = (data: any) => {
    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct._id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'users', label: 'Users', icon: Users },
  ];

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-zinc-950 text-white py-6 px-4 md:px-6">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-black uppercase tracking-tight">
            🔧 Admin Panel
          </h1>
          <Button
            variant="outline"
            className="rounded-none border-zinc-600 text-white hover:bg-zinc-800"
            onClick={() => navigate('/')}
          >
            Go to Site
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border bg-background sticky top-0 z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">

        {/* ─── Dashboard Tab ─── */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {statsLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-primary" size={40} />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard icon={Users} label="Total Users" value={stats?.totalUsers || 0} color="bg-blue-50 text-blue-600" />
                  <StatCard icon={Package} label="Total Products" value={stats?.totalProducts || 0} color="bg-purple-50 text-purple-600" />
                  <StatCard icon={ShoppingBag} label="Total Orders" value={stats?.totalOrders || 0} color="bg-green-50 text-green-600" />
                  <StatCard icon={IndianRupee} label="Total Revenue" value={`₹${(stats?.totalRevenue || 0).toLocaleString('en-IN')}`} color="bg-amber-50 text-amber-600" />
                </div>

                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                    <Clock size={20} />
                    Recent Orders
                  </h2>
                  <div className="border border-border overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted">
                        <tr>
                          <th className="text-left p-3 font-bold uppercase tracking-wider">Order ID</th>
                          <th className="text-left p-3 font-bold uppercase tracking-wider">Customer</th>
                          <th className="text-left p-3 font-bold uppercase tracking-wider">Amount</th>
                          <th className="text-left p-3 font-bold uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats?.recentOrders?.map((order: any) => (
                          <tr key={order._id} className="border-t border-border hover:bg-muted/50">
                            <td className="p-3 font-mono text-xs">{order._id.slice(-8)}</td>
                            <td className="p-3">{order.user?.name || 'N/A'}</td>
                            <td className="p-3 font-bold">₹{order.totalPrice?.toLocaleString('en-IN')}</td>
                            <td className="p-3">
                              <span className={`px-2 py-1 text-xs font-bold rounded-full ${statusColors[order.status]}`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ─── Products Tab ─── */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black uppercase tracking-tight">
                Products ({productsData?.total || 0})
              </h2>
              <Button
                className="rounded-none font-bold uppercase tracking-wider flex items-center gap-2"
                onClick={() => { setEditingProduct(null); setShowProductModal(true); }}
              >
                <Plus size={16} />
                New Product
              </Button>
            </div>

            {productsLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-primary" size={40} />
              </div>
            ) : (
              <div className="border border-border overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3 font-bold uppercase tracking-wider">Product</th>
                      <th className="text-left p-3 font-bold uppercase tracking-wider">Category</th>
                      <th className="text-left p-3 font-bold uppercase tracking-wider">Price</th>
                      <th className="text-left p-3 font-bold uppercase tracking-wider">Stock</th>
                      <th className="text-left p-3 font-bold uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productsData?.products?.map((product: any) => (
                      <tr key={product._id} className="border-t border-border hover:bg-muted/50">
                        <td className="p-3">
                          <div className="font-bold">{product.name}</div>
                          <div className="text-muted-foreground text-xs">{product.brand}</div>
                        </td>
                        <td className="p-3">
                          <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1">
                            {product.category}
                          </span>
                        </td>
                        <td className="p-3 font-bold">₹{product.price?.toLocaleString('en-IN')}</td>
                        <td className="p-3">
                          <span className={`text-xs font-bold px-2 py-1 ${
                            product.stock > 10 ? 'bg-green-100 text-green-700' :
                            product.stock > 0 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {product.stock > 0 ? product.stock : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => { setEditingProduct(product); setShowProductModal(true); }}
                              className="p-1.5 hover:text-primary transition-colors"
                            >
                              <Pencil size={15} />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Do You Want to Delete Product?')) {
                                  deleteMutation.mutate(product._id);
                                }
                              }}
                              className="p-1.5 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {productsData?.products?.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    No product yet. Add from top!
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ─── Orders Tab ─── */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-xl font-black uppercase tracking-tight">
              All Orders
            </h2>

            {ordersLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-primary" size={40} />
              </div>
            ) : (
              <div className="border border-border overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3 font-bold uppercase tracking-wider">Order ID</th>
                      <th className="text-left p-3 font-bold uppercase tracking-wider">Customer</th>
                      <th className="text-left p-3 font-bold uppercase tracking-wider">Items</th>
                      <th className="text-left p-3 font-bold uppercase tracking-wider">Total</th>
                      <th className="text-left p-3 font-bold uppercase tracking-wider">Status</th>
                      <th className="text-left p-3 font-bold uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.map((order: any) => (
                      <tr key={order._id} className="border-t border-border hover:bg-muted/50">
                        <td className="p-3 font-mono text-xs">{order._id.slice(-8)}</td>
                        <td className="p-3">
                          <div className="font-bold">{order.user?.name}</div>
                          <div className="text-muted-foreground text-xs">{order.user?.email}</div>
                        </td>
                        <td className="p-3 text-muted-foreground">
                          {order.orderItems?.length} items
                        </td>
                        <td className="p-3 font-bold">
                          ₹{order.totalPrice?.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-1 text-xs font-bold rounded-full ${statusColors[order.status]}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <select
                            value={order.status}
                            onChange={(e) => orderStatusMutation.mutate({
                              id: order._id,
                              status: e.target.value
                            })}
                            className="border border-input rounded-none px-2 py-1 text-xs bg-background focus:outline-none focus:ring-1 focus:ring-ring"
                          >
                            {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {orders?.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    No order yet.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ─── Users Tab ─── */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <h2 className="text-xl font-black uppercase tracking-tight">
              All Users
            </h2>

            {usersLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-primary" size={40} />
              </div>
            ) : (
              <div className="border border-border overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3 font-bold uppercase tracking-wider">Name</th>
                      <th className="text-left p-3 font-bold uppercase tracking-wider">Email</th>
                      <th className="text-left p-3 font-bold uppercase tracking-wider">Role</th>
                      <th className="text-left p-3 font-bold uppercase tracking-wider">Joined</th>
                      <th className="text-left p-3 font-bold uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((user: any) => (
                      <tr key={user._id} className="border-t border-border hover:bg-muted/50">
                        <td className="p-3 font-bold">{user.name}</td>
                        <td className="p-3 text-muted-foreground">{user.email}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                            user.role === 'admin'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-3 text-muted-foreground text-xs">
                          {new Date(user.createdAt).toLocaleDateString('en-IN')}
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => {
                              if (confirm('Do You Wan to delete User?')) {
                                deleteUserMutation.mutate(user._id);
                              }
                            }}
                            className="p-1.5 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <ProductModal
          product={editingProduct}
          onClose={() => { setShowProductModal(false); setEditingProduct(null); }}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
}