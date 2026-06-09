import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { Toaster as SonnerToaster } from "sonner";
import NotFound from "@/pages/not-found";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useLocation } from "wouter";
import { useEffect } from "react";

import { CartProvider } from '@/context/CartContext';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';


// Pages
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";

const queryClient = new QueryClient();

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans">
      <Navbar />
      <main className="flex-grow pt-[72px] md:pt-[84px]">{children}</main>
      <Footer />
    </div>
  );
}

// Protected Route — sirf logged in user ke liye
function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { user, isLoading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading]);

  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!user) return null;
  return <Component />;
}

// Auth Route — agar already logged in ho toh login/register pe mat jao
function AuthRoute({ component: Component }: { component: React.ComponentType }) {
  const { user, isLoading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!isLoading && user) {
      navigate('/');
    }
  }, [user, isLoading]);

  if (isLoading) return null;
  if (user) return null;
  return <Component />;
}

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        {/* Public routes — Layout ke saath */}
        <Route path="/">
          <Layout><ScrollToTop /><Home /></Layout>
        </Route>
        <Route path="/products">
          <Layout><ScrollToTop /><Products /></Layout>
        </Route>
        <Route path="/about">
          <Layout><ScrollToTop /><About /></Layout>
        </Route>
        <Route path="/contact">
          <Layout><ScrollToTop /><Contact /></Layout>
        </Route>

        {/* Auth routes — Navbar/Footer nahi chahiye */}
        <Route path="/login">
          <AuthRoute component={LoginPage} />
        </Route>
        <Route path="/register">
          <AuthRoute component={RegisterPage} />
        </Route>
          <Route path="/cart">
        <Layout><ScrollToTop /><CartPage /></Layout>
       </Route>
      <Route path="/checkout">
      <ProtectedRoute component={() => <Layout><CheckoutPage /></Layout>} />
      </Route>

        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
          <SonnerToaster position="top-right" richColors />
        </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;