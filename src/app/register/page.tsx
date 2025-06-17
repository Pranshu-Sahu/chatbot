'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>();

  const password = watch('password', '');

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setError(null);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, email: data.email, password: data.password }),
      });
      const resData = await res.json();
      if (res.ok) {
        router.push('/login');
      } else {
        setError(resData.error || 'Something went wrong');
      }
    } catch () {
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
          Register
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register('name', { required: 'Name is required' })}
            className={`mt-1 block w-full rounded-lg border ${
              errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-gray-50 dark:bg-gray-700 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' },
            })}
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
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'At least 6 characters' },
            })}
            className={`mt-1 block w-full rounded-lg border ${
              errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-gray-50 dark:bg-gray-700 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === password || 'Passwords do not match',
            })}
            className={`mt-1 block w-full rounded-lg border ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } bg-gray-50 dark:bg-gray-700 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
        >
          {isSubmitting ? 'Registering…' : 'Register'}
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
