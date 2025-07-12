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
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{t({ 'zh-HK': '用戶中心', 'zh-CN': '用户中心', 'en': 'User Center' })}</h1>
      
      {/* Profile Information */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-6">個人資料</h2>
        <form onSubmit={handleProfileUpdate}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">電郵地址</label>
              <p className="mt-1 p-2 bg-gray-100 rounded-md">{profile.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">用戶角色</label>
              <p className="mt-1 p-2 bg-gray-100 rounded-md">{profile.role}</p>
            </div>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">名字</label>
              <input type="text" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} className="mt-1 w-full p-2 border rounded-md" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">姓氏</label>
              <input type="text" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} className="mt-1 w-full p-2 border rounded-md" />
            </div>
          </div>
          <div className="text-right mt-6">
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">保存更改</button>
          </div>
        </form>
      </div>

      {/* Subscription Plan */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">我的訂閱</h2>
        <div className="bg-blue-50 p-6 rounded-lg flex justify-between items-center">
          <div>
            <p className="text-lg">您目前的方案是：<span className="font-bold text-blue-600">{profile.subscriptionPlan}</span></p>
            <p className="text-gray-500 text-sm mt-1">感謝您的支持！</p>
          </div>
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">升級方案</button>
        </div>
      </div>
    </div>
  );
};

export default UserCenterPage;
