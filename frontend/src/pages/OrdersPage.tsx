import { useQuery } from '@tanstack/react-query';
import { orderApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from 'wouter';
import { PageTransition } from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { Loader2, Package, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function OrdersPage() {
  const { user } = useAuth();
  const [, navigate] = useLocation();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['my-orders'],
    queryFn: orderApi.getMyOrders,
    enabled: !!user,
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <PageTransition>
      <section className="bg-zinc-950 py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            My <span className="text-primary">Orders</span>
          </h1>
          <p className="text-zinc-400 mt-2">All Your orders are here!</p>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={40} />
            </div>
          ) : !orders || orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
              <Package size={80} className="text-muted-foreground opacity-20" />
              <h2 className="text-2xl font-black uppercase tracking-tight">
                No Order!
              </h2>
              <p className="text-muted-foreground">
                No Order has been placed yet.
              </p>
              <Button
                className="rounded-none font-bold uppercase tracking-wider"
                onClick={() => navigate('/products')}
              >
                Do Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm mb-6">
                Total {orders.length} orders
              </p>
              {orders.map((order: any, idx: number) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border border-border bg-background hover:border-primary transition-colors"
                >
                  {/* Order Header */}
                  <div className="flex flex-wrap items-center justify-between p-4 border-b border-border gap-3">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Order ID</p>
                        <p className="font-mono font-bold text-sm">#{order._id.slice(-8).toUpperCase()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Date</p>
                        <p className="font-medium text-sm">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short', year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </div>

                  {/* Order Items */}
                  <div className="p-4 space-y-3">
                    {order.orderItems?.map((item: any) => (
                      <div key={item._id} className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted flex-shrink-0 overflow-hidden">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package size={16} className="text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-grow">
                          <p className="font-bold text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            ₹{item.price?.toLocaleString('en-IN')} × {item.quantity}
                          </p>
                        </div>
                        <p className="font-bold text-sm">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="flex items-center justify-between p-4 border-t border-border bg-muted/30">
                    <div>
                      <p className="text-xs text-muted-foreground">Shipping to</p>
                      <p className="text-sm font-medium">
                        {order.shippingAddress?.city}, {order.shippingAddress?.pinCode}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Total</p>
                      <p className="font-black text-lg text-primary">
                        ₹{order.totalPrice?.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}