import React, { useState, useEffect } from 'react';
import { Table, Typography, Button, message, Space, Popconfirm, Modal, Form, Input, Select } from 'antd';
import type { TableProps } from 'antd';
import apiClient from '../services/apiClient';
import { SubscriptionPlan, UserRole } from '../common/types';

const { Title } = Typography;
const { Option } = Select;

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  subscriptionPlan: SubscriptionPlan;
  createdAt: string;
}

const UserListPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/users');
      setUsers(response.data);
    } catch (error) {
      // Error is handled by the interceptor, but you can add component-specific logic here
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (record: User) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.submit();
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
  };

  const onFinish = async (values: any) => {
    if (!editingUser) return;
    try {
      await apiClient.put(`/users/${editingUser.id}`, values);
      message.success('用户更新成功');
      setIsModalVisible(false);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      // Error is handled by the interceptor
    }
  };

  const columns: TableProps<User>['columns'] = [
    { title: '邮箱', dataIndex: 'email', key: 'email' },
    { title: '名', dataIndex: 'firstName', key: 'firstName' },
    { title: '姓', dataIndex: 'lastName', key: 'lastName' },
    { title: '角色', dataIndex: 'role', key: 'role' },
    { title: '订阅套餐', dataIndex: 'subscriptionPlan', key: 'subscriptionPlan' },
    { title: '创建于', dataIndex: 'createdAt', key: 'createdAt', render: (text: string) => new Date(text).toLocaleDateString() },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: User) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>用户管理</Title>
      <Table columns={columns} dataSource={users} rowKey="id" loading={loading} />
      <Modal
        title="编辑用户"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        destroyOnClose
        okText="保存"
        cancelText="取消"
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="firstName" label="名">
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label="姓">
            <Input />
          </Form.Item>
          <Form.Item name="subscriptionPlan" label="订阅套餐" rules={[{ required: true }]}>
            <Select>
              {Object.values(SubscriptionPlan).map(plan => (
                <Option key={plan} value={plan}>{plan}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserListPage;
