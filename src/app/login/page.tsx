'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setError(null);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      const resData = await res.json();
      if (res.ok) {
        // store JWT
        localStorage.setItem('token', resData.token);
        router.push('/chat');
      } else {
        setError(resData.error || 'Login failed');
      }
    } catch (_error) {
      console.error(_error);
      setError('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center">
          Login
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email', { required: 'Email is required' })}
            className={`mt-1 block w-full rounded-lg border ${
              errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-gray-50 dark:bg-gray-700 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register('password', { required: 'Password is required' })}
            className={`mt-1 block w-full rounded-lg border ${
              errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-gray-50 dark:bg-gray-700 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
        >
          {isSubmitting ? 'Logging in…' : 'Login'}
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account?{' '}
          <Link href="/register" className="text-indigo-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
