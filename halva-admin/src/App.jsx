import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Modal } from 'antd';
const { confirm } = Modal;
import {
  HomeOutlined,
  CompassOutlined,
  QuestionCircleOutlined,
  BookOutlined,
  NotificationOutlined,
  PictureOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import 'antd/dist/reset.css';
import './index.css';

import Regions from './pages/Regions';
import Hotels from './pages/Hotels';
import Tours from './pages/Tours';
import CreateNews from './pages/CreateNews';
import Login from './pages/Login';
import PrivateRoute from './guard/PrivateRoute';
import axios from './api/axiosConfig';
import BookingPage from './pages/BookingPage';
import Banners from './pages/Banners';
import DiscountTours from './pages/DiscountTour';
import PromotionsAdmin from './pages/PromotionsAdmin';
import AdminFaqs from './pages/AdminFaqs';
import ContactRequests from './pages/ContactRequests';
import AdminReviews from './pages/AdminReviews';
import AdminVouchers from './pages/AdminVouchers';

const { Header, Content, Sider } = Layout;

const AppLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem('token');
    await axios.post('/auth/logout', {}, { withCredentials: true });
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
       <Sider
      width={260}
      breakpoint="lg"
      collapsedWidth="0"
      className="min-h-screen bg-[#001529]"
    >
      <div className="flex flex-col items-center mt-6 mb-2">
        <img src="/logo-halva.svg" alt="Logo" className="h-32" />
        {/* <div className="text-white text-lg font-bold mt-2">Halva Travel</div> */}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        className="mt-6 text-[15px] font-medium"
      >
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <Link to="/">Регионы</Link>
        </Menu.Item>

        <Menu.Item key="/hotels" icon={<HomeOutlined />}>
          <Link to="/hotels">Отели</Link>
        </Menu.Item>

        <Menu.Item key="/tours" icon={<CompassOutlined />}>
          <Link to="/tours">Туры</Link>
        </Menu.Item>

        <Menu.Item key="/faq" icon={<QuestionCircleOutlined />}>
          <Link to="/faq">FAQ</Link>
        </Menu.Item>

        <Menu.Item key="/bookings" icon={<BookOutlined />}>
          <Link to="/bookings">Бронирования</Link>
        </Menu.Item>
        <Menu.Item key="/requests" icon={<BookOutlined />}>
          <Link to="/requests">Контактные заявки</Link>
        </Menu.Item>

        <Menu.Item key="/admin-reviews" icon={<BookOutlined />}>
  <Link to="/admin-reviews">Отзывы</Link>
</Menu.Item>

<Menu.Item key="/admin-vouchers" icon={<NotificationOutlined />}>
  <Link to="/admin-vouchers">Ваучеры</Link>
</Menu.Item>

        <Menu.Item key="/news" icon={<NotificationOutlined />}>
          <Link to="/news">Новости</Link>
        </Menu.Item>

        <Menu.Item key="/banners" icon={<PictureOutlined />}>
          <Link to="/banners">Баннера</Link>
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          <Button
            type="primary"
            onClick={handleLogout}
            className="w-full text-left text-white hover:text-white"
          >
            Выйти
          </Button>
        </Menu.Item>
      </Menu>
    </Sider>
      <Layout>
        <Header className="text-white shadow-md px-4">
          <h1 className='text-white '>Панель администратора</h1>
        </Header>
        <Content className="m-4 bg-white p-6 rounded shadow">{children}</Content>
      </Layout>
    </Layout>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return isLoginPage ? (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  ) : (
    <AppLayout>
      <Routes>
        <Route path="/" element={<PrivateRoute><Regions /></PrivateRoute>} />
        <Route path="/hotels" element={<PrivateRoute><Hotels /></PrivateRoute>} />
        <Route path="/faq" element={<PrivateRoute><AdminFaqs /></PrivateRoute>} />
        <Route path="/tours" element={<PrivateRoute><Tours /></PrivateRoute>} />
        <Route path="/requests" element={<PrivateRoute><ContactRequests /></PrivateRoute>} />
        <Route path="/special-tours" element={<PrivateRoute><DiscountTours /></PrivateRoute>} />
        <Route path="/promotions" element={<PrivateRoute><PromotionsAdmin /></PrivateRoute>} />
        <Route path="/admin-reviews" element={<PrivateRoute><AdminReviews /></PrivateRoute>} />
        <Route path="/admin-vouchers" element={<PrivateRoute><AdminVouchers /></PrivateRoute>} />
        <Route path="/news" element={<PrivateRoute><CreateNews /></PrivateRoute>} />
        <Route path="/bookings" element={<PrivateRoute><BookingPage /></PrivateRoute>} />
        <Route path="/banners" element={<PrivateRoute><Banners /></PrivateRoute>} />
      </Routes>
    </AppLayout>
  );
};

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
