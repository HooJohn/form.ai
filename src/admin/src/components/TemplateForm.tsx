import React, { useEffect } from 'react';
import { Form, Input, Select, Button, InputNumber } from 'antd';
import { FormTemplate, ApplicationType } from '../common/types';

const { Option } = Select;

interface TemplateFormProps {
  form: any; // Ant Design Form instance
  onFinish: (values: any) => void;
  initialValues?: Partial<FormTemplate>;
}

const TemplateForm: React.FC<TemplateFormProps> = ({ form, onFinish, initialValues }) => {
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={initialValues}>
      <Form.Item name="schoolName" label="学校名称" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="标题 (繁体)" name={['title', 'zh-HK']} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="标题 (英文)" name={['title', 'en']} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="标题 (简体)" name={['title', 'zh-CN']} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="描述">
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item name="gradeLevels" label="适用年级" rules={[{ required: true }]}>
        <Select mode="tags" placeholder="例如: S1, S2, P1" />
      </Form.Item>
      <Form.Item name="applicationType" label="申请类型" rules={[{ required: true }]}>
        <Select>
          {Object.values(ApplicationType).map(type => (
            <Option key={type} value={type}>{type}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="version" label="版本" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="schoolLogoUrl" label="学校Logo链接">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default TemplateForm;
