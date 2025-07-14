import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../../services/auth.service';
import { useLanguage } from '../../contexts/LanguageContext';
import { UserRole } from '../../common/types';

const GoogleIcon = () => (
  <svg className="w-6 h-6 mr-3" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.519-3.486-11.031-8.346l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,36.626,44,30.638,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);

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
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg w-full mx-auto p-10 border border-secondary/10 rounded-2xl shadow-2xl bg-white/95 backdrop-blur-xl">
      <h2 className="text-3xl font-bold text-center mb-6 text-text-primary">
        {isLogin ? t({ 'zh-HK': '歡迎回來', 'zh-CN': '欢迎回来', 'en': 'Welcome Back' }) : t({ 'zh-HK': '創建您的帳戶', 'zh-CN': '创建您的账户', 'en': 'Create Your Account' })}
      </h2>
      
      <button className="w-full flex items-center justify-center py-3 px-4 border border-secondary/20 rounded-lg text-text-primary font-semibold hover:bg-accent transition-colors duration-300">
        <GoogleIcon />
        {t({ 'zh-HK': '使用 Google 繼續', 'zh-CN': '使用 Google 继续', 'en': 'Continue with Google' })}
      </button>

      <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-secondary/10"></div>
        <span className="flex-shrink mx-4 text-text-secondary text-sm">{t({ 'zh-HK': '或使用電郵', 'zh-CN': '或使用电邮', 'en': 'Or with email' })}</span>
        <div className="flex-grow border-t border-secondary/10"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-text-secondary mb-2 text-sm" htmlFor="email">
            {t({ 'zh-HK': '電郵地址', 'zh-CN': '电邮地址', 'en': 'Email Address' })}
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-3 border border-secondary/30 rounded-lg focus:ring-primary focus:border-primary transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-text-secondary mb-2 text-sm" htmlFor="password">
            {t({ 'zh-HK': '密碼', 'zh-CN': '密码', 'en': 'Password' })}
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-3 border border-secondary/30 rounded-lg focus:ring-primary focus:border-primary transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg text-lg font-semibold hover:bg-primary-dark disabled:bg-gray-400 transition-transform transform hover:scale-105" disabled={isLoading}>
          {isLoading ? t({ 'zh-HK': '處理中...', 'zh-CN': '处理中...', 'en': 'Processing...' }) : (isLogin ? t({ 'zh-HK': '登錄', 'zh-CN': '登录', 'en': 'Login' }) : t({ 'zh-HK': '創建帳戶', 'zh-CN': '创建账户', 'en': 'Create Account' }))}
        </button>
      </form>
      
      <p className="text-center text-sm text-text-secondary mt-6">
        {isLogin 
          ? t({ 'zh-HK': '沒有帳戶？', 'zh-CN': '没有账户？', 'en': 'No account?' })
          : t({ 'zh-HK': '已有帳戶？', 'zh-CN': '已有账户？', 'en': 'Already have an account?' })}
        <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-primary hover:underline ml-1">
          {isLogin 
            ? t({ 'zh-HK': '立即註冊', 'zh-CN': '立即注册', 'en': 'Register' })
            : t({ 'zh-HK': '前往登錄', 'zh-CN': '前往登录', 'en': 'Login' })}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
