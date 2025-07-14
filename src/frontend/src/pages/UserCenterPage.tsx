import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import * as userService from '../services/user.service';
import { UserProfile } from './../common/types';

type PublicProfile = Omit<UserProfile, 'hashedPassword'>;

const UserCenterPage = () => {
  const { t } = useLanguage();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state for editing
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userService.getProfile();
        setProfile(data);
        setFirstName(data.firstName || '');
        setLastName(data.lastName || '');
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedProfile = await userService.updateProfile({ firstName, lastName });
      setProfile(updatedProfile);
      alert(t({ 'zh-HK': '資料更新成功！', 'zh-CN': '资料更新成功！', 'en': 'Profile updated successfully!' }));
    } catch (err: any) {
      alert(t({ 'zh-HK': '更新失敗。', 'zh-CN': '更新失败。', 'en': 'Update failed.' }));
    }
  };

  if (isLoading) return <div className="p-8"><p>Loading profile...</p></div>;
  if (error) return <div className="p-8"><p className="text-red-500">Error: {error}</p></div>;
  if (!profile) return <div className="p-8"><p>Could not load profile.</p></div>;

  return (
    <div className="p-8 bg-accent min-h-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-text-primary">{t({ 'zh-HK': '用戶中心', 'zh-CN': '用户中心', 'en': 'User Center' })}</h1>
        
        {/* Profile Information */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-8 border border-secondary/10">
          <h2 className="text-2xl font-semibold mb-6 text-text-primary">{t({ 'zh-HK': '個人資料', 'zh-CN': '个人资料', 'en': 'Profile Information' })}</h2>
          <form onSubmit={handleProfileUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary">{t({ 'zh-HK': '電郵地址', 'zh-CN': '电邮地址', 'en': 'Email Address' })}</label>
                <p className="mt-1 p-3 bg-accent rounded-lg text-text-secondary">{profile.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary">{t({ 'zh-HK': '用戶角色', 'zh-CN': '用户角色', 'en': 'User Role' })}</label>
                <p className="mt-1 p-3 bg-accent rounded-lg text-text-secondary">{profile.role}</p>
              </div>
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-text-secondary">{t({ 'zh-HK': '名字', 'zh-CN': '名字', 'en': 'First Name' })}</label>
                <input type="text" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} className="mt-1 w-full p-3 border border-secondary/30 rounded-lg focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-text-secondary">{t({ 'zh-HK': '姓氏', 'zh-CN': '姓氏', 'en': 'Last Name' })}</label>
                <input type="text" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} className="mt-1 w-full p-3 border border-secondary/30 rounded-lg focus:ring-primary focus:border-primary" />
              </div>
            </div>
            <div className="text-right mt-6">
              <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-300">
                {t({ 'zh-HK': '保存更改', 'zh-CN': '保存更改', 'en': 'Save Changes' })}
              </button>
            </div>
          </form>
        </div>

        {/* Subscription Plan */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-secondary/10">
          <h2 className="text-2xl font-semibold mb-6 text-text-primary">{t({ 'zh-HK': '我的訂閱', 'zh-CN': '我的订阅', 'en': 'My Subscription' })}</h2>
          <div className="bg-accent p-6 rounded-lg flex justify-between items-center">
            <div>
              <p className="text-lg text-text-secondary">{t({ 'zh-HK': '您目前的方案是：', 'zh-CN': '您目前的方案是：', 'en': 'Your current plan is:' })}<span className="font-bold text-accent-pink ml-2">{profile.subscriptionPlan}</span></p>
              <p className="text-text-secondary text-sm mt-1">{t({ 'zh-HK': '感謝您的支持！', 'zh-CN': '感谢您的支持！', 'en': 'Thank you for your support!' })}</p>
            </div>
            <button className="bg-accent-green text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300">
              {t({ 'zh-HK': '升級方案', 'zh-CN': '升级方案', 'en': 'Upgrade Plan' })}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCenterPage;
