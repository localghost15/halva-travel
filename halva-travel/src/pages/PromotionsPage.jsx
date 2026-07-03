import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import axios from '../api/axiosConfig';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SliderSlick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PageLoader from '../components/Loader';
import TourCard from '../components/tour-card';


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


const PromotionsPage = () => {
  const { t } = useTranslation();
   const [tours, setTours] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [toursRes, regionsRes, hotelsRes] = await Promise.all([
          axios.get("/tours"),

        ]);
        setTours(toursRes.data);
      } catch (err) {
        console.error("Ошибка при загрузке:", err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000); 
      }
    };
  
    fetchAllData();
  }, []);


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
    <div className="bg-[#A88856]/10 mx-auto px-4 sm:px-6 py-10 md:py-12">
         <PageLoader isLoading={loading} />
      {/* Заголовок */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-5xl font-bold text-center mb-8"
      >
        {t('promotionsPage.title')}
      </motion.h1>

      {/* Подзаголовок */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="text-center text-gray-600 text-lg mb-10 max-w-3xl mx-auto"
      >
        {t('promotionsPage.subtitle')}
      </motion.p>

      {/* Блок информации */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="bg-white max-w-7xl mx-auto rounded-3xl p-5 sm:p-8 md:p-12 space-y-6"
      >
        <h2 className="text-xl md:text-2xl font-semibold mb-4">{t('promotionsPage.offSeasonTitle')}</h2>

        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>{t('promotionsPage.discount')}</li>
          <li>{t('promotionsPage.noCrowds')}</li>
          <li>{t('promotionsPage.cheaperHotels')}</li>
          <li>{t('promotionsPage.personalService')}</li>
          <li>{t('promotionsPage.relaxedAtmosphere')}</li>
        </ul>

        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold">{t('promotionsPage.validityTitle')}</h3>
          <p className="text-gray-700 mt-2">{t('promotionsPage.validityDescription')}</p>
        </div>

        <div className="text-center pt-6">
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          className="inline-block bg-[#DFAF68] text-white px-6 py-3 rounded-full hover:bg-[#c59b56] transition"
          >
            {t('promotionsPage.cta')}
          </motion.a>
        </div>

      
      </motion.div>

      <div className="max-w-screen-2xl mt-12 mx-auto px-4">
          <SliderSlick className="relative" {...sliderSettings}>
            {tours.slice(0, 15).map((tour) => (
              <div key={tour._id} className="px-2 mx-auto">
                <TourCard tour={tour} />
              </div>
            ))}
          </SliderSlick>
        </div>
    </div>
  );
};

export default PromotionsPage;
