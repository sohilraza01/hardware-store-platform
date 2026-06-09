import { useCart } from '@/context/CartContext';
import { useLocation } from 'wouter';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition } from '@/components/PageTransition';
import { useAuth } from '@/context/AuthContext';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  const [, navigate] = useLocation();
  const { user } = useAuth();

  if (cartItems.length === 0) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
          <ShoppingCart size={80} className="text-muted-foreground opacity-20" />
          <h2 className="text-3xl font-black uppercase tracking-tight">Cart Khali Hai!</h2>
          <p className="text-muted-foreground text-lg">
            Koi product add nahi kiya abhi tak.
          </p>
          <Button
            className="rounded-none font-bold uppercase tracking-wider px-8"
            onClick={() => navigate('/products')}
          >
            Products Dekho
          </Button>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <section className="bg-zinc-950 py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Tumhara <span className="text-primary">Cart</span>
          </h1>
          <p className="text-zinc-400 mt-2">{totalItems} items</p>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Cart Items List */}
            <div className="flex-grow space-y-4">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="flex gap-4 border border-border p-4 bg-background"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-muted flex-shrink-0 overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow">
                      <h3 className="font-black uppercase tracking-tight text-foreground">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{item.brand}</p>
                      <p className="text-primary font-bold text-lg mt-1">
                        ₹{item.price.toLocaleString('en-IN')}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>

                      <div className="flex items-center gap-2 border border-border">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="p-2 hover:bg-muted transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="p-2 hover:bg-muted transition-colors"
                          disabled={item.quantity >= item.stock}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <p className="font-black text-foreground">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="border border-border p-6 bg-background sticky top-24">
                <h2 className="text-xl font-black uppercase tracking-tight mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm">
                  {cartItems.map(item => (
                    <div key={item._id} className="flex justify-between text-muted-foreground">
                      <span className="truncate max-w-[160px]">
                        {item.name} × {item.quantity}
                      </span>
                      <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border mt-4 pt-4">
                  <div className="flex justify-between font-black text-lg">
                    <span>Total</span>
                    <span className="text-primary">
                      ₹{totalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Shipping checkout pe calculate hoga
                  </p>
                </div>

                <Button
                  className="w-full mt-6 rounded-none font-bold uppercase tracking-wider flex items-center gap-2"
                  onClick={() => {
                    if (!user) {
                      navigate('/login');
                    } else {
                      navigate('/checkout');
                    }
                  }}
                >
                  {user ? 'Checkout Karo' : 'Login Karke Checkout Karo'}
                  <ArrowRight size={16} />
                </Button>

                <Button
                  variant="outline"
                  className="w-full mt-3 rounded-none font-bold uppercase tracking-wider"
                  onClick={() => navigate('/products')}
                >
                  Shopping Jaari Rakho
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}