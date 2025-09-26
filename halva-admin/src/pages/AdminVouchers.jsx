import React, { useEffect, useState } from 'react';
import { Table, Button, Tag, Space, Tooltip, message, Modal, Form, Select, Input } from 'antd';
import { DownloadOutlined, CopyOutlined } from '@ant-design/icons';
import axios from '../api/axiosConfig';

const AdminVouchers = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const [form] = Form.useForm();

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/vouchers');
      setRows(Array.isArray(data) ? data : []);
    } catch {
      message.error('Не удалось загрузить ваучеры');
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{ load(); }, []);

  const filtered = rows.filter(v => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      (v.code || '').toLowerCase().includes(q) ||
      (v.email || '').toLowerCase().includes(q) ||
      (v.status || '').toLowerCase().includes(q)
    );
  });

  const openStatus = (row) => {
    setCurrent(row);
    form.setFieldsValue({ status: row.status || 'new' });
    setOpen(true);
  };

  const saveStatus = async (vals) => {
    try {
      await axios.put(`/vouchers/${current._id}/status`, { status: vals.status });
      message.success('Статус обновлён');
      setOpen(false);
      load();
    } catch {
      message.error('Ошибка обновления статуса');
    }
  };

  const columns = [
    { title: 'Код', dataIndex: 'code', render: v => <Tag color="gold" bordered={false}>{v}</Tag> },
    { title: 'Email', dataIndex: 'email' },
    {
      title: 'Статус',
      dataIndex: 'status',
      filters: ['new','issued','used','expired'].map(v => ({ text: v, value: v })),
      onFilter: (val, rec) => (rec.status || 'new') === val,
      render: st => {
        const color = { new:'default', issued:'blue', used:'green', expired:'red' }[st || 'new'];
        return <Tag color={color} bordered={false}>{st || 'new'}</Tag>;
      },
      width: 120
    },
    {
      title: 'Действителен до',
      dataIndex: 'expiresAt',
      render: d => {
        if (!d) return <span className="text-gray-400">—</span>;
        const expired = new Date(d) < new Date();
        return (
          <Space>
            <span>{new Date(d).toLocaleDateString()}</span>
            {expired && <Tag color="red" bordered={false}>истёк</Tag>}
          </Space>
        );
      },
      width: 170
    },
    { title: 'Скачан', dataIndex: 'downloadedAt', width: 170, render: d => d ? new Date(d).toLocaleString() : <span className="text-gray-400">—</span> },
    {
      title: 'Действия',
      width: 230,
      render: (_, rec) => {
        const link = `/api/vouchers/${rec.code}/download`;
        return (
          <Space>
            <Tooltip title="Скачать PDF">
              <Button size="small" icon={<DownloadOutlined />} href={link} target="_blank" />
            </Tooltip>
            <Tooltip title="Скопировать код">
              <Button size="small" icon={<CopyOutlined />} onClick={() => {navigator.clipboard.writeText(rec.code); message.success('Скопировано');}} />
            </Tooltip>
            <Button size="small" onClick={() => openStatus(rec)}>Статус</Button>
          </Space>
        );
      }
    }
  ];

  return (
    <div className="p-6 bg-white rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Ваучеры</h2>
        <div className="flex gap-2">
          <Input placeholder="Поиск: код, email, статус" value={search} onChange={e=>setSearch(e.target.value)} />
          <Button onClick={load}>Обновить</Button>
        </div>
      </div>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={filtered}
        loading={loading}
        bordered
        size="middle"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        okText="Сохранить"
        cancelText="Отмена"
        title={`Обновить статус: ${current?.code || ''}`}
      >
        <Form form={form} layout="vertical" onFinish={saveStatus}>
          <Form.Item name="status" label="Статус" rules={[{ required: true }]}>
            <Select
              options={[
                { value: 'new', label: 'new' },
                { value: 'issued', label: 'issued' },
                { value: 'used', label: 'used' },
                { value: 'expired', label: 'expired' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminVouchers;
