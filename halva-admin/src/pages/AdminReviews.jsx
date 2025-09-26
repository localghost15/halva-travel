import React, { useEffect, useState } from 'react';
import { Table, Button, Tag, Space, Tooltip, Popconfirm, message, Input } from 'antd';
import { DownloadOutlined, CopyOutlined } from '@ant-design/icons';
import axios from '../api/axiosConfig';

const AdminReviews = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/reviews/all');
      setRows(Array.isArray(data) ? data : []);
    } catch {
      message.error('Не удалось загрузить отзывы');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const toggleActive = async (id, next) => {
    try {
      await axios.put(`/reviews/${id}/active`, { isActive: next });
      message.success(next ? 'Опубликован' : 'Скрыт');
      load();
    } catch {
      message.error('Ошибка изменения статуса');
    }
  };

  const remove = async (id) => {
    try {
      await axios.delete(`/reviews/${id}`);
      message.success('Удалено');
      load();
    } catch {
      message.error('Ошибка при удалении');
    }
  };

  const filtered = rows.filter(r => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      (r.name || '').toLowerCase().includes(q) ||
      (r.email || '').toLowerCase().includes(q) ||
      (r.text || '').toLowerCase().includes(q) ||
      (r.voucher?.code || '').toLowerCase().includes(q)
    );
  });

  const columns = [
    { title: 'Имя', dataIndex: 'name', render: v => <span className="font-medium">{v}</span> },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Рейтинг', dataIndex: 'rating', width: 90, render: r => <b>{r}/5</b> },
    {
      title: 'Текст',
      dataIndex: 'text',
      render: t => <span className="text-gray-600">{t?.slice(0,120)}{t?.length>120?'…':''}</span>
    },
    {
      title: 'Дата',
      dataIndex: 'createdAt',
      width: 160,
      sorter: (a,b)=> new Date(a.createdAt)-new Date(b.createdAt),
      render: d => d ? new Date(d).toLocaleString() : '-'
    },
    {
      title: 'Статус',
      dataIndex: 'isActive',
      width: 130,
      filters: [
        { text: 'Опубликован', value: true },
        { text: 'Скрыт', value: false }
      ],
      onFilter: (val, rec)=> rec.isActive===val,
      render: v => v ? <Tag color="green" bordered={false}>Опубликован</Tag> : <Tag bordered={false}>Скрыт</Tag>
    },
    {
      title: 'Ваучер',
      render: (_, rec) => {
        const code = rec?.voucher?.code;
        if (!code) return <span className="text-gray-400">—</span>;
        const link = `/api/vouchers/${code}/download`;
        return (
          <Space size="small">
            <Tag color="gold" bordered={false}>{code}</Tag>
            <Tooltip title="Скачать PDF">
              <Button size="small" icon={<DownloadOutlined />} href={link} target="_blank" />
            </Tooltip>
            <Tooltip title="Скопировать код">
              <Button size="small" icon={<CopyOutlined />} onClick={() => {navigator.clipboard.writeText(code); message.success('Код скопирован');}} />
            </Tooltip>
          </Space>
        );
      },
      width: 230
    },
    {
      title: 'Действия',
      render: (_, rec) => (
        <Space>
          <Button
            size="small"
            type={rec.isActive ? 'default' : 'primary'}
            onClick={() => toggleActive(rec._id, !rec.isActive)}
          >
            {rec.isActive ? 'Скрыть' : 'Опубликовать'}
          </Button>
          <Popconfirm title="Удалить отзыв?" okText="Да" cancelText="Нет" onConfirm={() => remove(rec._id)}>
            <Button size="small" danger>Удалить</Button>
          </Popconfirm>
        </Space>
      ),
      width: 200
    }
  ];

  return (
    <div className="p-6 bg-white rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Отзывы</h2>
        <div className="flex gap-2">
          <Input placeholder="Поиск: имя, email, текст, код" value={search} onChange={e=>setSearch(e.target.value)} />
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
    </div>
  );
};

export default AdminReviews;
