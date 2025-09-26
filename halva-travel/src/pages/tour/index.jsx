import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Modal, Form, Input, message , Button} from "antd";
import {
  WifiOutlined,
  RestOutlined,
  CoffeeOutlined,
  CarOutlined,
  AppstoreAddOutlined,
  FireOutlined,
  PhoneOutlined,
  SafetyOutlined,
  EnvironmentOutlined,
  SmileOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import { BsWhatsapp, BsTelegram, BsEnvelope, BsClipboard } from "react-icons/bs";
import { FaBed, FaBus, FaUtensils, FaPlane, FaTrain, FaTicketAlt, FaHiking, FaTheaterMasks } from "react-icons/fa";
import { MdOutlineGTranslate } from "react-icons/md";
import { LuPartyPopper } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../../api/axiosConfig";
import { useTranslation } from "react-i18next";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { MoonIcon, TimerIcon } from "lucide-react";
import {toast} from 'react-hot-toast'
import SliderSlick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PageLoader from "../../components/Loader";
import TourCard from "../../components/tour-card";
import getAppLang from "../../utils/getAppLang";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const blinkVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 cursor-pointer top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100"
  >
    <FaChevronLeft strokeWidth={0.7} />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 cursor-pointer top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100"
  >
    <FaChevronRight strokeWidth={0.7} />
  </button>
);


const getAmenityIcon = (key) => {
  switch (key) {
    case "wifi": return <WifiOutlined />;
    case "ac": return <RestOutlined />;
    case "breakfast": return <CoffeeOutlined />;
    case "parking": return <CarOutlined />;
    case "pool": return <AppstoreAddOutlined />;
    case "heating": return <FireOutlined />;
    case "phone": return <PhoneOutlined />;
    case "safe": return <SafetyOutlined />;
    case "view": return <EnvironmentOutlined />;
    case "kids": return <SmileOutlined />;
    case "gift": return <GiftOutlined />;
    case "accommodation": return <FaBed className="text-lg" />;
    case "transport": return <FaBus className="text-lg" />;
    case "guide": return <MdOutlineGTranslate className="text-lg" />;
    case "meals": return <FaUtensils className="text-lg" />;
    case "flight_tickets": return <FaPlane className="text-lg" />;
    case "train_tickets": return <FaTrain className="text-lg" />;
    case "entrance_tickets": return <FaTicketAlt className="text-lg" />;
    case "entertainment": return <LuPartyPopper className="text-lg" />;
    case "cultural": return <FaTheaterMasks className="text-lg" />;
    case "hiking": return <FaHiking className="text-lg" />;
    default: return null;
  }
};

const getAmenityLabel = (key) => {
  const labels = {
    wifi: "Wi-Fi",
    ac: "Кондиционер",
    breakfast: "Завтрак",
    parking: "Парковка",
    pool: "Бассейн",
    heating: "Отопление",
    phone: "Телефон",
    safe: "Сейф",
    view: "Вид на город",
    kids: "Детская зона",
    gift: "Подарок",
  };
  return labels[key] || key;
};

const Tour = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const [tour, setTour] = useState(null);
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [isBookingVisible, setIsBookingVisible] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [form] = Form.useForm();
  const [showShareMenu, setShowShareMenu] = useState(false);
  const currentUrl = window.location.href;

  const handleBooking = async () => {
    try {
      const values = await form.validateFields();
      setBookingLoading(true);
      await axios.post("/bookings", {
        name: values.name,
        phone: values.phone,
        tour: tour._id,
      });
      message.success("Бронирование успешно отправлено!");
      form.resetFields();
      setIsBookingVisible(false);
    } catch (err) {
      message.error("Ошибка при бронировании");
    } finally {
      setBookingLoading(false);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tourRes, toursRes] = await Promise.all([
          axios.get(`/tours/slug/${slug}`),
          axios.get(`/tours`)
        ]);
        setTour(tourRes.data);
        setTours(toursRes.data); // Предполагаем, что у тебя есть стейт setToursList
      } finally {
        setTimeout(() => setIsLoading(false), 600); // для плавности загрузки
      }
    };
  
    fetchData();
  }, [slug]);

  const prev = () => setIndex((prev) => (prev - 1 + tour.images.length) % tour.images.length);
  const next = () => setIndex((prev) => (prev + 1) % tour.images.length);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [tour, index]);

  if (!tour) return  <PageLoader isLoading={isLoading} />;

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
        <div className="text-gray-500 text-xs flex items-center gap-1 mb-1 subpixel-antialiased">
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8334 5.66683C12.8334 9.72673 8.50002 14.6668 8.50002 14.6668C8.50002 14.6668 4.16669 9.72673 4.16669 5.66683C4.16669 3.2736 6.10679 1.3335 8.50002 1.3335C10.8933 1.3335 12.8334 3.2736 12.8334 5.66683Z" stroke="#535353" stroke-width="0.5" stroke-linejoin="round"></path><ellipse cx="8.5" cy="5.66699" rx="2" ry="2" stroke="#535353" stroke-width="0.5" stroke-linejoin="round"></ellipse></svg>
            <span>{tour.route[getAppLang(i18n.language)]}</span>
          </div>
          <h1 className="text-2xl font-bold mb-1">{tour.title[getAppLang(i18n.language)]}</h1>
        <div className="flex w-full mb-3 justify-between items-center">
          <div className="flex items-center gap-2">
          {tour.includes?.length > 0 && (
  <div className="">
    <div className="flex gap-1">
      {tour.includes.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-2  px-1 py-2 text-sm"
        >
          {getAmenityIcon(item)}
        </div>
      ))}
    </div>
  </div>
)}
<div className="w-px h-3 bg-black/10" />
{/* <p className="text-gray-500 text-xs flex items-center gap-1.5">
  <img src="/hotel.svg" alt="" />
  {tour.hotel?.name[i18n.language]}</p> */}

          </div>

<div className="flex items-center">
<div className="relative">
  <button
    onClick={() => setShowShareMenu(!showShareMenu)}
    className="mt-3 w-full flex items-center justify-end gap-2  mb-3 font-medium cursor-pointer py-2 px-4 rounded text-sm"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"><circle cx="4" cy="8" r="2" stroke="#535353"></circle><circle cx="12" cy="4" r="2" stroke="#535353"></circle><circle cx="12" cy="12" r="2" stroke="#535353"></circle><path stroke="#535353" stroke-linejoin="round" d="M5.667 7 10 4.667M5.667 9 10 11.333"></path></svg>
    
  </button>

  <AnimatePresence>
    {showShareMenu && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="absolute right-0 left-0 mt-2 w-60 bg-white rounded-2xl p-2 shadow-xl z-50"
      >
    <div
      onClick={() => {
        navigator.clipboard.writeText(currentUrl);
        toast.success(t("linkCopied"));
        setShowShareMenu(false);
      }}
      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded cursor-pointer text-sm text-gray-800"
    >
      <BsClipboard /> {t("copyLink")}
    </div>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(currentUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded text-sm text-gray-800"
        >
          <BsWhatsapp /> WhatsApp
        </a>

        <a
          href={`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded text-sm text-gray-800"
        >
          <BsTelegram /> Telegram
        </a>

        <a
          href={`mailto:?subject=Тур от Halva Travel&body=${encodeURIComponent(currentUrl)}`}
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded text-sm text-gray-800"
        >
          <BsEnvelope /> E-mail
        </a>
      </motion.div>
    )}
  </AnimatePresence>
</div>
{tour.region?.weather && (
 <div className=" bg-white  rounded-xl px-4 py-1 flex items-center gap-2">
 <div className="flex flex-col">
 <span className="text-[12px]">
  Воздух
  </span>
 <span className="text-[10px] font-medium">
  {tour.region.weather.condition}
  </span>
  </div>
 {/* <img src={tour.region.weather.icon} alt="weather-icon" className="w-10 h-10" /> */}
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="#FFC44D" fill-rule="evenodd" d="M1.25 12a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75ZM18.25 12a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75ZM20.53 3.47a.75.75 0 0 1 0 1.06l-2.5 2.5a.75.75 0 1 1-1.06-1.06l2.5-2.5a.75.75 0 0 1 1.06 0Zm-13.5 13.5a.75.75 0 0 1 0 1.06l-2.5 2.5a.75.75 0 0 1-1.06-1.06l2.5-2.5a.75.75 0 0 1 1.06 0ZM3.47 3.47a.75.75 0 0 0 0 1.06l2.5 2.5a.75.75 0 0 0 1.06-1.06l-2.5-2.5a.75.75 0 0 0-1.06 0Zm13.5 13.5a.75.75 0 0 0 0 1.06l2.5 2.5a.75.75 0 1 0 1.06-1.06l-2.5-2.5a.75.75 0 0 0-1.06 0Z" clip-rule="evenodd"></path><path fill="#FFC44D" d="M12 6.25a5.75 5.75 0 1 0 0 11.5 5.75 5.75 0 0 0 0-11.5Z"></path><path fill="#FFC44D" fill-rule="evenodd" d="M12 1.25a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75ZM12 18.25a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd"></path></svg>
 <div>
   <p className="text-sm text-gray-700">
    {tour.region.weather.temp}°C
   </p>
 </div>
</div>
)}
</div>
        </div>

          <div className="w-full mt-6">
            <div className="relative overflow-hidden rounded-lg shadow-lg h-[220px] sm:h-[280px] md:h-[360px] lg:h-[440px] xl:h-[500px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={tour.images[index]}
                  src={`${baseURL}/uploads/${tour.images[index]}`}
                  alt={`Slide ${index}`}
                  variants={blinkVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow z-10">
                <FaChevronLeft />
              </button>
              <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow z-10">
                <FaChevronRight />
              </button>
            </div>

            <div style={{ marginTop: "16px" }} className="flex gap-3 overflow-x-auto">
  {tour.images.map((img, i) => (
    <div
      key={i}
      className={`relative min-w-[90px] h-[65px] rounded-md overflow-hidden cursor-pointer border-2 ${
        i === index ? "border-[#DFAF68]" : "border-transparent"
      }`}
      onClick={() => setIndex(i)}
    >
      <img
        src={`${baseURL}/uploads/${img}`}
        alt={`thumb-${i}`}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>
  ))}
</div>

<h3 style={{ marginTop: "16px" }} className="font-semibold text-[16px]">
  {t("shortDescriptionTitle")}:
</h3>

<div style={{ marginTop: "8px" }} className="text-gray-700 text-sm">
  {tour.shortDescription[getAppLang(i18n.language)]}
</div>

<div style={{ marginTop: "24px" }}>
  {tour.extras?.[getAppLang(i18n.language)] && (
    <>
      <h3 style={{ marginTop: "16px" }} className="text-[16px] font-semibold">
        {t("extrasTitle")}:
      </h3>
      <p style={{ marginTop: "8px" }} className="text-sm text-gray-700">
        {tour.extras[getAppLang(i18n.language)]}
      </p>
    </>
  )}
</div>

          </div>
        </div>


        <div className="bg-white max-h-max sticky top-14 p-4 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">{t("bookingTourTitle")}</h2>

      <div style={{ marginTop: 0 }} className="flex gap-2 items-center">
      <div className="tours-info__ico">
        <MoonIcon color="#A88856" strokeWidth={1.4} />
        </div>
        <div className="flex flex-col text-gray-600">
          <span className="text-[12px]">{t("nights")}</span>
          <p className="text-[14px]">{tour.nights}</p>
        </div>
      </div>

      <div style={{ marginTop: '16px' }} className="flex gap-2 items-center">
      <div className="tours-info__ico">
        <TimerIcon color="#A88856" strokeWidth={1.4} />
        </div>
        <div className="flex flex-col text-gray-600">
          <span className="text-[12px]">{t("duration")}</span>
          <p className="text-[14px]">{tour.days} {t("days") || "дней"}</p>
        </div>
      </div>
      <div style={{ marginTop: '16px' }} className="flex gap-2 items-center">
      <div className="tours-info__ico">
        <img className="h-6" src="/hotel.svg" alt="" />
        </div>
        <div className="flex flex-col text-gray-600">
          <span className="text-[12px]">{t("dropdown.hotels")}</span>
          <p className="text-[14px]">{tour.hotel?.name[getAppLang(i18n.language)]}</p>
        </div>
      </div>

      <div style={{ marginTop: '16px' }} className="text-[20px] text-[#DFAF68] font-semibold">
        от {tour.price?.toLocaleString()} <span className="text-sm font-normal">{t('pricePerPerson')} $</span>
      </div>

      <button
        onClick={() => setIsBookingVisible(true)}
        style={{ marginTop: '16px' }}
        className="bg-[#DFAF68] w-full inline-block cursor-pointer text-white px-6 py-3 rounded-xl text-sm hover:bg-[#b08c52] transition"
      >
        {t("bookButton")}
      </button>

      <div
        style={{ marginTop: '16px', marginBottom: '16px' }}
        className="bg-[#A88856]/10 text-[#A88856] flex items-center space-x-3 px-4 py-2 rounded-xl w-full text-sm"
      >
        <span className="flex gap-3 font-medium items-center">
              <svg width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.9287 20.9799V14.9729C30.9287 12.0521 29.7698 9.2509 27.7069 7.18557C25.644 5.12025 22.8461 3.95996 19.9287 3.95996C17.0113 3.95996 14.2134 5.12025 12.1505 7.18557C10.0876 9.2509 8.92871 12.0521 8.92871 14.9729V20.9799C8.92871 23.9007 10.0876 26.7019 12.1505 28.7673C14.2134 30.8326 17.0113 31.9929 19.9287 31.9929C22.8461 31.9929 25.644 30.8326 27.7069 28.7673C29.7698 26.7019 30.9287 23.9007 30.9287 20.9799ZM16.2187 24.2738C16.3117 24.18 16.4223 24.1055 16.5441 24.0547C16.666 24.0038 16.7967 23.9777 16.9287 23.9777C17.0607 23.9777 17.1914 24.0038 17.3133 24.0547C17.4351 24.1055 17.5457 24.18 17.6387 24.2738C17.9389 24.5759 18.2957 24.8156 18.6887 24.9792C19.0817 25.1428 19.5031 25.227 19.9287 25.227C20.3543 25.227 20.7757 25.1428 21.1687 24.9792C21.5617 24.8156 21.9186 24.5759 22.2187 24.2738C22.407 24.0853 22.6624 23.9794 22.9287 23.9794C23.195 23.9794 23.4504 24.0853 23.6387 24.2738C23.827 24.4623 23.9328 24.718 23.9328 24.9846C23.9328 25.2513 23.827 25.5069 23.6387 25.6955C20.1687 29.1295 14.5787 25.9157 16.2187 24.2738Z" fill="#A88856"></path><path d="M35.9287 12.9706H34.7887C34.2947 9.37617 32.5176 6.0823 29.786 3.69795C27.0543 1.3136 23.5528 0 19.9287 0C16.3047 0 12.8031 1.3136 10.0715 3.69795C7.33979 6.0823 5.5627 9.37617 5.06871 12.9706H3.92871C3.13306 12.9706 2.37 13.2871 1.80739 13.8503C1.24478 14.4136 0.928711 15.1776 0.928711 15.9741V21.9812C0.928711 22.7778 1.24478 23.5417 1.80739 24.105C2.37 24.6683 3.13306 24.9847 3.92871 24.9847H6.92871C7.19393 24.9847 7.44828 24.8792 7.63582 24.6915C7.82335 24.5037 7.92871 24.2491 7.92871 23.9835V13.9718C7.9318 13.7318 7.84868 13.4987 7.6945 13.315C7.54032 13.1312 7.32534 13.009 7.08871 12.9706C7.57286 9.90973 9.13203 7.12224 11.4858 5.10955C13.8395 3.09685 16.8333 1.99106 19.9287 1.99106C23.0241 1.99106 26.0179 3.09685 28.3717 5.10955C30.7254 7.12224 32.2846 9.90973 32.7687 12.9706C32.5321 13.009 32.3171 13.1312 32.1629 13.315C32.0087 13.4987 31.9256 13.7318 31.9287 13.9718V23.9835C31.9287 24.2491 32.0341 24.5037 32.2216 24.6915C32.4091 24.8792 32.6635 24.9847 32.9287 24.9847C32.9295 27.5588 32.0297 30.0518 30.3855 32.0307C28.7414 34.0096 26.4569 35.3494 23.9287 35.8174C23.9728 35.4632 23.9409 35.1036 23.8353 34.7626C23.7296 34.4217 23.5527 34.1072 23.3161 33.84C23.0796 33.5729 22.7889 33.3593 22.4635 33.2134C22.138 33.0676 21.7853 32.9928 21.4287 32.9941H19.4287C18.7657 32.9941 18.1298 33.2578 17.6609 33.7272C17.1921 34.1966 16.9287 34.8332 16.9287 35.4971C16.9287 36.1609 17.1921 36.7975 17.6609 37.2669C18.1298 37.7363 18.7657 38 19.4287 38H21.9287C25.3765 38 28.6831 36.6287 31.1211 34.1879C33.5591 31.7471 34.9287 28.4366 34.9287 24.9847H35.9287C36.7244 24.9847 37.4874 24.6683 38.05 24.105C38.6126 23.5417 38.9287 22.7778 38.9287 21.9812V15.9741C38.9287 15.1776 38.6126 14.4136 38.05 13.8503C37.4874 13.2871 36.7244 12.9706 35.9287 12.9706Z" fill="#A88856"></path></svg>
              <div className="flex flex-col">
            <span className="text-[10px]">{t("hotlineText")}</span>
            <p className="text-[16px]">+998(94) 007-22-99</p>
            <button
              className="bg-[#DFAF68] max-w-max mt-3 cursor-pointer text-white px-3 py-2 rounded-md text-xs hover:bg-[#b08c52] transition"
            >
              {t("callButton")}
            </button>
          </div>
        </span>
      </div>
    </div>
</div>

<div className="max-w-screen-2xl mt-12 mx-auto px-4">
          <SliderSlick className="relative" {...sliderSettings}>
            {tours.slice(0, 15).map((tour) => (
              <div key={tour._id} className="px-2 mx-auto">
                <TourCard tour={tour} />
              </div>
            ))}
          </SliderSlick>
        </div>

      <AnimatePresence>
  {isBookingVisible && (
    <motion.div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Бронирование тура</h2>
        <Form layout="vertical" form={form} onFinish={handleBooking}>
          <Form.Item
            label="Ваше имя"
            name="name"
            rules={[{ required: true, message: "Введите имя" }]}
          >
            <Input placeholder="Имя" size="large" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="phone"
            rules={[
              { required: true, message: 'Введите Email' },
              { type: 'email', message: 'Введите корректный Email' }
            ]}
          >
            <Input placeholder="Email" size="large" />
          </Form.Item>
          <div className="flex justify-end gap-3 mt-4">
            <Button block onClick={() => setIsBookingVisible(false)}>Отмена</Button>
            <Button
            block
              type="primary"
              htmlType="submit"
              loading={bookingLoading}
            >
              Отправить
            </Button>
          </div>
        </Form>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
};

export default Tour;