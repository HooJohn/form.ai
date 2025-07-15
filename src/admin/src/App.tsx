import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, theme, ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UserListPage from './pages/UserListPage';
import TemplateListPage from './pages/TemplateListPage';
import MainLayout from './components/MainLayout';

const { Content } = Layout;

// A simple auth check. In a real app, this would be more robust.
const isAuthenticated = () => !!localStorage.getItem('admin_token');

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/*"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Content
                    style={{
                      margin: '24px 16px',
                      padding: 24,
                      minHeight: 280,
                      background: colorBgContainer,
                      borderRadius: borderRadiusLG,
                    }}
                  >
                    <Routes>
                      <Route path="/dashboard" element={<DashboardPage />} />
                      <Route path="/users" element={<UserListPage />} />
                      <Route path="/templates" element={<TemplateListPage />} />
                      <Route path="/" element={<Navigate to="/dashboard" />} />
                    </Routes>
                  </Content>
                </MainLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;
