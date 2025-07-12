import React, { useState } from 'react';
import { login, register } from '../../services/auth.service';
import { UserRole } from './../../common/types/Shared';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      if (isLogin) {
        const { token, user } = await login({ email, password });
        // TODO: Store token and user info, then redirect
        setMessage(`Logged in as ${user.email}. Token: ${token.substring(0, 20)}...`);
      } else {
        const { token, user } = await register({ email, password, preferredLanguage: 'zh-HK', role: UserRole.PARENT });
        // TODO: Store token and user info, then redirect
        setMessage(`Registered as ${user.email}. Token: ${token.substring(0, 20)}...`);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {message && <p className="text-green-500 text-center mt-4">{message}</p>}
      <button onClick={() => setIsLogin(!isLogin)} className="w-full mt-4 text-blue-500 hover:underline">
        {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
      </button>
    </div>
  );
};

export default AuthForm;
