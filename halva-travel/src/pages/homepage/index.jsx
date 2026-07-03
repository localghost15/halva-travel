import React, { useEffect, useRef, useState } from 'react';
import axios from '../../api/axiosConfig';
import { useTranslation } from 'react-i18next';
import CarouselHeader from '../../components/carousel-header';
import { motion } from "framer-motion";
import TourCard from '../../components/tour-card';
import NewsSection from '../../components/news-section';
import TravelCarousel from '../../components/carousel';
import PartnerLogosMarquee from '../../components/partners-marquee';
import { Select, Button, Row, Col, Slider } from 'antd';
import SliderSlick from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PageLoader from '../../components/Loader';

const { Option } = Select;

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


const iconList  = [
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <path d="M4.06494 7.32693H9.29075" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M16 7.32693H28" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
  <circle cx="12.6488" cy="7.35829" r="3.35829" stroke="white" stroke-linecap="round" stroke-linejoin="round"></circle>
  <path d="M4.06494 15.9687H18.6419" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M25.3584 15.9687L28.0002 15.9687" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
  <circle cx="22.0004" cy="16" r="3.35829" stroke="white" stroke-linecap="round" stroke-linejoin="round"></circle>
  <path d="M4.06494 24.61H6.67777" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M13.3945 24.61L28.0003 24.61" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
  <circle cx="10.036" cy="24.6413" r="3.35829" stroke="white" stroke-linecap="round" stroke-linejoin="round"></circle>
</svg>,
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <path d="M24.0906 12.3948L21.1118 3.44255C20.9132 2.84949 20.2721 2.52755 19.6763 2.72524L4.05596 7.88198C3.46019 8.07967 3.13678 8.71791 3.33537 9.31096L5.77669 16.9377" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M21.6451 5.05176L3.86865 10.9202" stroke="white" stroke-linejoin="round"></path>
  <path d="M22.5364 7.72943L4.76562 13.5978" stroke="white" stroke-linejoin="round"></path>
  <path d="M15.148 26.5099H28.1981C28.8222 26.5099 29.3329 26.0016 29.3329 25.3803V15.2136C29.3329 14.5923 28.8222 14.084 28.1981 14.084H11.7437C11.1195 14.084 10.6089 14.5923 10.6089 15.2136V16.9081" stroke="white" stroke-linejoin="round"></path>
  <path d="M17.4175 23.1211H20.924" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M23.5566 23.1211H27.0631" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M27.0636 18.6017C27.0636 19.5393 26.3032 20.2961 25.3614 20.2961H24.794C23.8521 20.2961 23.0918 19.5393 23.0918 18.6017C23.0918 17.6641 23.8521 16.9072 24.794 16.9072H25.3614C26.3032 16.9072 27.0636 17.6641 27.0636 18.6017Z" stroke="white" stroke-linejoin="round"></path>
  <path d="M8.90783 16.9082C5.45808 16.9082 2.6665 18.4276 2.6665 20.2971V25.9452C2.6665 27.8148 5.45808 29.3341 8.90783 29.3341C12.3576 29.3341 15.1492 27.8148 15.1492 25.9452V20.2971C15.1492 18.4276 12.3576 16.9082 8.90783 16.9082Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M15.1492 20.2971C15.1492 22.1667 12.3576 23.686 8.90783 23.686C5.45808 23.686 2.6665 22.1667 2.6665 20.2971" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M15.1492 23.1211C15.1492 24.9907 12.3576 26.51 8.90783 26.51C5.45808 26.51 2.6665 24.9907 2.6665 23.1211" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>,
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
    <path d="M9.9043 16.9621H17.5742C18.6029 16.9621 19.4511 16.7749 20.1189 16.4004C20.7866 16.0259 21.2829 15.5273 21.6078 14.9047C21.9327 14.282 22.0951 13.5962 22.0951 12.8473C22.0951 12.0983 21.9327 11.4125 21.6078 10.7898C21.2829 10.1672 20.7866 9.66864 20.1189 9.29415C19.4511 8.91967 18.6029 8.73242 17.5742 8.73242H13.9925V23.2687M18.0983 19.6352H9.9043" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M28.7057 20.0423C29.5568 17.3671 29.5417 14.4915 28.6627 11.8254C27.7837 9.15925 26.0855 6.83858 23.8103 5.19409C21.5351 3.54961 18.7988 2.66524 15.9915 2.66699C13.1842 2.66875 10.449 3.55656 8.17585 5.20389C5.90267 6.85122 4.20744 9.17401 3.33176 11.8413C2.45608 14.5085 2.44462 17.3841 3.29902 20.0582C4.15342 22.7324 5.83008 25.0686 8.09006 26.734C10.35 28.3994 13.078 29.309 15.8852 29.3331" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M25.1031 19.9628C25.254 19.9628 25.381 20.003 25.4785 20.0835C25.7325 20.2939 25.7914 20.7513 25.795 21.097C25.8006 21.5599 25.6718 21.9185 25.5521 22.2185L25.151 23.221H27.5322C28.0401 23.221 28.4892 23.6546 28.491 24.1467C28.491 24.3754 28.4156 24.6261 28.2849 24.82L28.1046 25.0871L28.1818 25.3999C28.2665 25.7439 28.215 26.128 28.0457 26.4299L27.9187 26.6568L27.9647 26.9129C28.0217 27.2404 27.9389 27.6282 27.7512 27.899L27.5966 28.124L27.6279 28.3947C27.6519 28.6051 27.6114 28.7844 27.5102 28.9308C27.3022 29.229 26.9636 29.3333 26.2183 29.3333C26.1337 29.3333 26.049 29.3333 25.9588 29.3314C25.865 29.3314 25.7693 29.3296 25.6718 29.3296H25.6147C25.0111 29.3296 24.5216 29.165 24.0468 29.0058C23.8113 28.9271 23.5684 28.8448 23.3291 28.7936C23.0512 28.7332 22.7163 28.682 22.4182 28.6362C22.2526 28.6106 22.0814 28.585 21.9508 28.5612C21.7539 28.5265 21.3785 28.5082 21.1871 28.5082H19.4793C19.2456 28.5082 19.1187 28.3929 19.1187 28.3344V24.3462C19.1187 24.2876 19.2456 24.1724 19.4793 24.1724C20.2872 24.1724 21.7336 23.8595 22.352 23.2723C22.5507 23.0838 22.6979 22.9466 22.8304 22.8259C23.0181 22.6539 23.1801 22.5039 23.4101 22.2752L23.48 22.2057C23.7873 21.902 24.1683 21.5251 24.2787 21.0641L24.2934 21.0001C24.4277 20.4274 24.586 20.0359 24.9191 19.9774C24.9835 19.9664 25.0461 19.9609 25.1031 19.9609" stroke="white"></path>
</svg>,
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
    <path d="M5.30417 2.0957L5.43709 3.74975L7.11329 3.41008L5.58477 4.04512L6.41918 5.52933L5.3411 4.27403L4.18917 5.52933L5.05311 4.11158L3.50244 3.41008L5.11219 3.78667L5.30417 2.0957Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M10.643 2.0957L10.7833 3.74975L12.4522 3.41008L10.9236 4.04512L11.7654 5.52933L10.68 4.27403L9.52803 5.52933L10.392 4.11158L8.84131 3.41008L10.4511 3.78667L10.643 2.0957Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M15.9888 2.0957L16.1217 3.74975L17.7905 3.41008L16.262 4.04512L17.1038 5.52933L16.0257 4.27403L14.8738 5.52933L15.7304 4.11158L14.1797 3.41008L15.7968 3.78667L15.9888 2.0957Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M21.3276 2.0957L21.4605 3.74975L23.1367 3.41008L21.6082 4.04512L22.4426 5.52933L21.3645 4.27403L20.2126 5.52933L21.0766 4.11158L19.5259 3.41008L21.1356 3.78667L21.3276 2.0957Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M26.667 2.0957L26.8073 3.74975L28.4761 3.41008L26.9476 4.04512L27.782 5.52933L26.7039 4.27403L25.552 5.52933L26.4159 4.11158L24.8652 3.41008L26.475 3.78667L26.667 2.0957Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M8.7749 28.6974V10.0672C8.85613 9.46911 9.34348 9.00391 9.93421 9.00391H22.0368C22.6202 9.00391 23.1149 9.46911 23.1962 10.0598V28.6974" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M8.06543 11.9727H5.56959C4.92717 11.9727 4.39551 12.5708 4.39551 13.2945L5.06008 28.6757" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M23.9053 11.9727H26.4011C27.0435 11.9727 27.5752 12.5708 27.5752 13.2945L26.9106 28.6757" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M10.9829 11.9795H20.9884" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M10.9829 14.7266H20.9884" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M10.9829 17.4813H20.9884" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M10.9829 20.2352H20.9884" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M10.9829 22.9826H20.9884" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M10.9829 25.7366H20.9884" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M3.42871 28.6974H28.5496" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>,
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <path d="M29.3331 22.1542V25.2312C29.3331 26.3192 28.8685 27.3627 28.0415 28.1321C27.2144 28.9015 26.0928 29.3337 24.9232 29.3337H16.999" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
  <path d="M29.333 14.9751H24.923C24.3382 14.9751 23.7774 15.1912 23.3638 15.5759C22.9503 15.9606 22.718 16.4823 22.718 17.0264V22.1546C22.718 22.6986 22.9503 23.2204 23.3638 23.605C23.7774 23.9897 24.3382 24.2059 24.923 24.2059H27.128C27.7128 24.2059 28.2736 23.9897 28.6871 23.605C29.1006 23.2204 29.333 22.6986 29.333 22.1546V14.9751ZM29.333 14.9751C29.333 13.3502 28.9872 11.7413 28.3155 10.2413C27.6437 8.74138 26.6593 7.38002 25.4191 6.23579C24.1789 5.09157 22.7074 4.18714 21.0896 3.57468C19.4717 2.96223 17.7395 2.65388 15.9928 2.66742C14.2474 2.65558 12.5166 2.96519 10.9004 3.5784C9.28409 4.19162 7.81423 5.09632 6.57549 6.24037C5.33674 7.38443 4.3536 8.74522 3.68272 10.2443C3.01183 11.7434 2.66646 13.3513 2.6665 14.9751V22.1546C2.6665 22.6986 2.89881 23.2204 3.31233 23.605C3.72584 23.9897 4.28669 24.2059 4.87148 24.2059H7.07646C7.66126 24.2059 8.2221 23.9897 8.63561 23.605C9.04913 23.2204 9.28144 22.6986 9.28144 22.1546V17.0264C9.28144 16.4823 9.04913 15.9606 8.63561 15.5759C8.2221 15.1912 7.66126 14.9751 7.07646 14.9751H2.6665" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
];

const Home = () => {
  const { t, i18n } = useTranslation();
  const [tours, setTours] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [regions, setRegions] = useState([]);
  const sliderRef = useRef();
  const reasons = t('reasons.list', { returnObjects: true });
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredTours, setFilteredTours] = useState([]);
  const [filters, setFilters] = useState({
    region: null,
    hotel: null,
    minPrice: null,
    maxPrice: null,
    minDays: null,
    maxDays: null,
    minNights: null,
    maxNights: null,
    titleLang: i18n.language || 'en'
  });

  useEffect(() => {
    // Жестко устанавливаем первый слайд после mount
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0, true);
    }
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [toursRes, regionsRes, hotelsRes] = await Promise.all([
          axios.get("/tours"),
          axios.get("/regions"),
          axios.get("/hotels"),
        ]);
        setTours(toursRes.data);
        setFilteredTours(toursRes.data);
        setRegions(regionsRes.data);
        setHotels(hotelsRes.data);
      } catch (err) {
        console.error("Ошибка при загрузке:", err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000); // задержка — чтобы анимация не срезалась
      }
    };
  
    fetchAllData();
  }, []);


  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15, // задержка между карточками
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };
  

  

  const handleFilter = () => {
    const params = { ...filters };
    axios.get('/tours', { params })
      .then(res => setFilteredTours(res.data))
      .catch(err => console.error('Ошибка при фильтрации туров:', err));
  };

  useEffect(() => {
    handleFilter();
  }, [filters.region]);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: [0.25, 0.8, 0.25, 1],
      },
    }),
  };

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
          centerMode: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,         // ✅ на мобиле центрируем
          centerPadding: '0px',     // ✅ без отступов
        },
      },
    ],
  };

  return (
    <div>
      <PageLoader isLoading={loading} />
      <div className='carousel-bg'>
        <CarouselHeader />
      </div>

      <div className='bg-[#A88856]/10 py-8 md:py-12'>
        <h2 className='max-w-screen-2xl mx-auto px-4 uppercase text-2xl md:text-3xl font-bold mb-2'>
          {t('recommendedTours')}
        </h2>

        <div className="max-w-screen-2xl mx-auto px-4">
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    {mounted && (
   <SliderSlick ref={sliderRef} className="relative" {...sliderSettings}>
   {tours.slice(0, 15).map((tour) => (
     <div key={tour._id} className="flex justify-center px-2 slick-slide">
       <motion.div
         variants={itemVariants}
         className="w-full"
       >
         <TourCard tour={tour} />
       </motion.div>
     </div>
   ))}
 </SliderSlick>
)}
   
  </motion.div>
</div>
        <TravelCarousel />

        <div className="bg-[#fff] max-w-screen-2xl mb-12 rounded-3xl mx-auto py-12">
      <div className="mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
           {t('reasons.title')}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 text-center">
          {reasons.map((title, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="bg-[#DFAF68] w-[4em] h-[4em] rounded-full flex items-center justify-center mb-4">
               <span className=' w-[2em] h-[2em]'> {iconList[index]}</span> 
              </div>
              <p className="text-gray-700 text-sm font-medium">{title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

        <h2 className='max-w-screen-2xl mx-auto px-4 uppercase text-2xl md:text-3xl font-bold mt-8 mb-4'>
          {t('travelNow')}
        </h2>

        <div className='max-w-screen-2xl mx-auto px-4 mb-6'>
          <div className='flex flex-wrap gap-3'>
            <button
              onClick={() => setFilters(prev => ({ ...prev, region: null }))}
              className={`px-4 py-2 rounded-xl cursor-pointer text-sm font-medium transition-all duration-200  ${
                !filters.region ? 'bg-[#DFAF68] text-white' : ' text-gray-800   '
              }`}
            >
              {t('all')}
            </button>
            {regions.map(region => (
              <button
                key={region._id}
                onClick={() => setFilters(prev => ({ ...prev, region: region._id }))}
                className={`px-4 py-2 rounded-xl cursor-pointer text-sm font-medium transition-all duration-200 ${
                  filters.region === region._id ? 'bg-[#DFAF68] text-white' : ' text-gray-800   '
                }`}
              >
                {region.name[i18n.language]}
              </button>
            ))}
          </div>
        </div>


        <div className="max-w-screen-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mx-auto p-4">
          {filteredTours.map((tour, i) => (
            <motion.div
              key={tour._id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUpVariant}
            >
              <TourCard tour={tour} />
            </motion.div>
          ))}
        </div>

       

        <div className='bg-white'>
          <NewsSection />
          <h2 className="text-2xl md:text-3xl max-w-screen-2xl px-4 mx-auto font-bold mb-4">
            {t('trustedBy')}
            <div className="w-40 h-[4px] bg-[#DFAF68] mt-2" />
          </h2>
          <PartnerLogosMarquee />
        </div>
      </div>
    </div>
  );
};

export default Home;
