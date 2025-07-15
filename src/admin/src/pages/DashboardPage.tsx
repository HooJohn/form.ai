import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Statistic, message } from 'antd';
import { UserOutlined, DollarCircleOutlined, CopyOutlined } from '@ant-design/icons';
import { Pie, Line } from '@ant-design/charts';
import apiClient from '../services/apiClient';

const { Title } = Typography;

interface StatsData {
  totalUsers: number;
  totalTemplates: number;
  totalPaidUsers: number;
  usersByPlan: Record<string, number>;
  recentRegistrations: { date: string; count: number }[];
}

const DashboardPage = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.get('/dashboard/stats');
        setStats(response.data);
      } catch (error) {
        // Error is handled by the interceptor
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const pieData = stats
    ? Object.entries(stats.usersByPlan)
        .filter(([, count]) => count > 0) // Do not show plans with 0 users
        .map(([plan, count]) => ({
          type: plan.charAt(0).toUpperCase() + plan.slice(1),
          value: count,
        }))
    : [];

  const pieConfig = {
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      offset: '-50%',
      content: (data: { value: number }) => `${data.value}`, // Use a function for robustness
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [{ type: 'element-active' }],
  };

  const lineConfig = {
    data: stats?.recentRegistrations || [],
    xField: 'date',
    yField: 'count',
    point: { size: 5, shape: 'diamond' },
    label: { style: { fill: '#aaa' } },
  };

  return (
    <div>
      <Title level={2}>数据分析</Title>
      <Row gutter={16}>
        <Col span={6}>
          <Card><Statistic title="总用户数" value={stats?.totalUsers} loading={loading} prefix={<UserOutlined />} /></Card>
        </Col>
        <Col span={6}>
          <Card><Statistic title="付费用户数" value={stats?.totalPaidUsers} loading={loading} prefix={<DollarCircleOutlined />} /></Card>
        </Col>
        <Col span={6}>
          <Card><Statistic title="总模板数" value={stats?.totalTemplates} loading={loading} prefix={<CopyOutlined />} /></Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '24px' }}>
        <Col span={12}>
          <Card title="各订阅套餐用户分布" loading={loading}>
            {stats && pieData.length > 0 && <Pie {...pieConfig} />}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="新用户注册趋势 (近7日)" loading={loading}>
            {stats && <Line {...lineConfig} />}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
