import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { orderApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageTransition } from '@/components/PageTransition';
import { Loader2, CheckCircle } from 'lucide-react';

const checkoutSchema = z.object({
  address: z.string().min(10, 'Pura address likho'),
  city: z.string().min(2, 'City ka naam likho'),
  pinCode: z.string().length(6, 'PIN code 6 digits ka hona chahiye'),
  phone: z.string().min(10, 'Valid phone number likho'),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  // Cart khali ho toh products pe bhejo
  if (cartItems.length === 0 && !orderPlaced) {
    navigate('/products');
    return null;
  }

  const onSubmit = async (data: CheckoutForm) => {
    try {
      setIsLoading(true);

      const orderItems = cartItems.map(item => ({
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }));

      const order = await orderApi.create({
        orderItems,
        shippingAddress: data,
        totalPrice,
      });

      setOrderId(order._id);
      setOrderPlaced(true);
      clearCart();
      toast.success('Order place ho gaya! 🎉');
    } catch (error: any) {
      toast.error(error.message || 'Order place nahi ho paya!');
    } finally {
      setIsLoading(false);
    }
  };

  // Order success screen
  if (orderPlaced) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
            {/* @ts-ignore */}
          <motion-div>
            <CheckCircle size={80} className="text-green-500 mx-auto" />
            {/* @ts-ignore */}
          </motion-div>
          <h2 className="text-3xl font-black uppercase tracking-tight">
            Order Place Ho Gaya! 🎉
          </h2>
          <p className="text-muted-foreground text-lg max-w-md">
            Tumhara order successfully place ho gaya hai. Hum jald hi deliver karenge!
          </p>
          <p className="text-sm text-muted-foreground font-mono bg-muted px-4 py-2">
            Order ID: {orderId}
          </p>
          <div className="flex gap-4">
            <Button
              className="rounded-none font-bold uppercase tracking-wider"
              onClick={() => navigate('/orders')}
            >
              Apne Orders Dekho
            </Button>
            <Button
              variant="outline"
              className="rounded-none font-bold uppercase tracking-wider"
              onClick={() => navigate('/products')}
            >
              Aur Shopping Karo
            </Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <section className="bg-zinc-950 py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            Checkout
          </h1>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Shipping Form */}
            <div className="flex-grow">
              <h2 className="text-2xl font-black uppercase tracking-tight mb-6">
                Shipping Details
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Naam
                  </label>
                  <Input
                    value={user?.name}
                    disabled
                    className="rounded-none bg-muted"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Pura Address *
                  </label>
                  <Input
                    {...register('address')}
                    placeholder="Ghar ka number, gali, mohalla..."
                    className="rounded-none"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">City *</label>
                    <Input
                      {...register('city')}
                      placeholder="Meerut"
                      className="rounded-none"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">PIN Code *</label>
                    <Input
                      {...register('pinCode')}
                      placeholder="250001"
                      maxLength={6}
                      className="rounded-none"
                    />
                    {errors.pinCode && (
                      <p className="text-red-500 text-sm mt-1">{errors.pinCode.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone *</label>
                  <Input
                    {...register('phone')}
                    placeholder="9876543210"
                    className="rounded-none"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                {/* Payment Method */}
                <div className="border border-border p-4 mt-4">
                  <h3 className="font-bold uppercase tracking-wider mb-3">
                    Payment Method
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-primary bg-primary" />
                    <span className="font-medium">Cash on Delivery (COD)</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Delivery pe payment karo — bilkul safe!
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-none font-bold uppercase tracking-wider h-12 text-base"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} />
                      Order Place Ho Raha Hai...
                    </>
                  ) : (
                    `Order Place Karo — ₹${totalPrice.toLocaleString('en-IN')}`
                  )}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="border border-border p-6 sticky top-24">
                <h2 className="text-xl font-black uppercase tracking-tight mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3">
                  {cartItems.map(item => (
                    <div key={item._id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground truncate max-w-[160px]">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border mt-4 pt-4 flex justify-between font-black text-lg">
                  <span>Total</span>
                  <span className="text-primary">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </PageTransition>
  );
}