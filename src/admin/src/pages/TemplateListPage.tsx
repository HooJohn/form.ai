import React, { useState, useEffect } from 'react';
import { Table, Typography, Button, message, Space, Popconfirm, Modal, Form } from 'antd';
import type { TableProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TemplateForm from '../components/TemplateForm';
import { FormTemplate } from '../common/types';
import apiClient from '../services/apiClient';

const { Title } = Typography;

const TemplateListPage = () => {
  const [templates, setTemplates] = useState<FormTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<FormTemplate | null>(null);
  const [form] = Form.useForm();

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/templates');
      setTemplates(response.data);
    } catch (error) {
      // Error handled by interceptor
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleAdd = () => {
    setEditingTemplate(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: FormTemplate) => {
    setEditingTemplate(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await apiClient.delete(`/templates/${id}`);
      message.success('模板删除成功');
      fetchTemplates();
    } catch (error) {
      // Error handled by interceptor
    }
  };

  const handleModalOk = () => {
    form.submit();
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values: any) => {
    try {
      if (editingTemplate) {
        await apiClient.put(`/templates/${editingTemplate.id}`, values);
        message.success('模板更新成功');
      } else {
        await apiClient.post('/templates', values);
        message.success('模板创建成功');
      }
      setIsModalVisible(false);
      fetchTemplates();
    } catch (error) {
      // Error handled by interceptor
    }
  };

  const columns: TableProps<FormTemplate>['columns'] = [
    { title: '学校名称', dataIndex: 'schoolName', key: 'schoolName' },
    { title: '模板标题 (繁体)', dataIndex: ['title', 'zh-HK'], key: 'title_hk' },
    { title: '适用年级', dataIndex: 'gradeLevels', key: 'gradeLevels', render: (levels: string[]) => levels.join(', ') },
    { title: '最���更新', dataIndex: 'lastUpdated', key: 'lastUpdated', render: (text) => new Date(text).toLocaleDateString() },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
          <Popconfirm title="确定删除此模板吗？" onConfirm={() => handleDelete(record.id)} okText="确定" cancelText="取消">
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2}>模板管理</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          添加新模板
        </Button>
      </div>
      <Table columns={columns} dataSource={templates} rowKey="id" loading={loading} />
      <Modal
        title={editingTemplate ? '编辑模板' : '添加新模板'}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        destroyOnClose
        okText="保存"
        cancelText="取消"
      >
        <TemplateForm form={form} onFinish={onFinish} initialValues={editingTemplate || {}} />
      </Modal>
    </div>
  );
};

export default TemplateListPage;
