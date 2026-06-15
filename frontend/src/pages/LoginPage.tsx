import { useState } from 'react';
import { useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Please Write Valid Email'),
  password: z.string().min(6, 'Password must have 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [, navigate] = useLocation();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setIsLoading(true);
      await login(data.email, data.password);
      toast.success('Login Successfully! 🎉');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Login Failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        {/* Logo / Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Ahmadi Hardware</h1>
          <p className="text-gray-500 mt-2">Login to Your Account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...register('email')}
              type="email"
              placeholder="ahmadi@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              {...register('password')}
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {isLoading ? 'Logining...' : 'Login'}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-500 mt-6">
          Don't have an Account?{' '}
          <a href="/register" className="text-blue-600 font-medium hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}