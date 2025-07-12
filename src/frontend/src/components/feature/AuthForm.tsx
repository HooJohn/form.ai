import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../../services/auth.service';
import { useLanguage } from '../../contexts/LanguageContext';
import { UserRole } from '../../common/types';

const AuthForm = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      let response;
      if (isLogin) {
        response = await authService.login({ email, password });
      } else {
        response = await authService.register({ email, password, preferredLanguage: language, role: UserRole.PARENT });
      }
      authService.storeAuthData(response.token, response.user);
      navigate('/dashboard'); // Redirect to dashboard on successful login/register
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isLogin ? t({ 'zh-HK': '登錄', 'zh-CN': '登录', 'en': 'Login' }) : t({ 'zh-HK': '註冊', 'zh-CN': '注册', 'en': 'Register' })}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            {t({ 'zh-HK': '電郵地址', 'zh-CN': '电邮地址', 'en': 'Email Address' })}
          </label>
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
          <label className="block text-gray-700 mb-2" htmlFor="password">
            {t({ 'zh-HK': '密碼', 'zh-CN': '密码', 'en': 'Password' })}
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400" disabled={isLoading}>
          {isLoading ? t({ 'zh-HK': '處理中...', 'zh-CN': '处理中...', 'en': 'Processing...' }) : (isLogin ? t({ 'zh-HK': '登錄', 'zh-CN': '登录', 'en': 'Login' }) : t({ 'zh-HK': '註冊', 'zh-CN': '注册', 'en': 'Register' }))}
        </button>
      </form>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      <button onClick={() => setIsLogin(!isLogin)} className="w-full mt-4 text-blue-500 hover:underline">
        {isLogin 
          ? t({ 'zh-HK': '需要帳戶？ 立即註冊', 'zh-CN': '需要账户？ 立即注册', 'en': 'Need an account? Register' })
          : t({ 'zh-HK': '已有帳戶？ 前往登錄', 'zh-CN': '已有账户？ 前往登录', 'en': 'Have an account? Login' })}
      </button>
    </div>
  );
};

export default AuthForm;
