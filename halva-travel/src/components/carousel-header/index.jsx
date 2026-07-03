import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import axios from "../../api/axiosConfig";
import getAppLang from "../../utils/getAppLang";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselHeader = () => {
  const { i18n } = useTranslation();
  const lang = getAppLang(i18n.language);
  const [banners, setBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);


  useEffect(() => {
    axios
      .get("/banners")
      .then((res) => {
        const active = res.data.filter((b) => b.isActive);
        setBanners(active);
        if (active.length > 0) {
          setTimeout(() => setCurrentSlide(0), 50);
        }
      })
      .catch((err) => console.error("Ошибка загрузки баннеров:", err));
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto p-3 sm:p-5">
      {banners.length > 0 && (
        <Carousel
          className="rounded-2xl md:rounded-3xl overflow-hidden"
          autoPlay
          infiniteLoop
          showThumbs={false}
          showArrows={false}
          showStatus={false}
          interval={5000}
          selectedItem={currentSlide}
          onChange={(index) => setCurrentSlide(index)}
        >
          {banners.map((banner, index) => (
            <div key={index} className="relative h-[340px] sm:h-[450px] md:h-[600px] overflow-hidden">
              {/* Фон баннера */}
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${banner.image}`}
                alt={banner.title?.[lang]}
                className="w-full h-full object-cover"
              />

              {/* --- Самолет --- */}
              {/* <AnimatePresence mode="wait">
                {currentSlide === index && (
                  <motion.img
                    key={`plane-${index}`}
                    src="/plane.png" // ⚡ Твой самолет
                    alt="Plane"
                    className="absolute bottom-[3%] right-[-150px] w-20 md:w-28 lg:w-32 z-10"
                    initial={{ x: "100vw", opacity: 1 }}
                    animate={{ x: "5vw", opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 4, ease: "easeInOut" }}
                  />
                )}
              </AnimatePresence> */}

              {/* Основной текст */}
              <AnimatePresence mode="wait">
                {currentSlide === index && (
                  <motion.div
                    key={`text-${index}`}
                    className="absolute inset-0 bg-black/20 flex flex-col justify-center items-start px-5 sm:px-8 md:px-10 text-white"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <motion.span
                      className="bg-[#A88856]/50 text-sm px-3 py-1 rounded-full w-fit mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      Реклама
                    </motion.span>

                    <motion.h2
                      className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-4"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      {banner.title?.[lang]}
                    </motion.h2>

                    <motion.p
                      className="text-sm sm:text-base md:text-lg mb-4 max-w-xl"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                    >
                      {banner.subtitle?.[lang]}
                    </motion.p>

                    <motion.button
                      className="bg-[#DFAF68] cursor-pointer text-white px-5 py-2.5 md:px-6 md:py-3 rounded-xl text-sm hover:bg-[#b08c52] transition"
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      {banner.cta?.[lang] || "Подробнее"}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* --- Слой 1: Человек --- */}
              {/* <AnimatePresence mode="wait">
                {currentSlide === index && (
                  <motion.img
                    key={`person-${index}`}
                    src="/man.png"
                    alt="Person"
                    height="300"
                    initial={{ opacity: 0, x: 150 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ height: "700px" }}
                    exit={{ opacity: 0, x: 150 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                    className="hidden md:block absolute top-[-5%] right-[-25%] w-12 md:w-36 lg:w-44 object-contain z-20"
                  />
                )}
              </AnimatePresence> */}

              {/* --- Слой 2: Верблюд --- */}
              {/* <AnimatePresence mode="wait">
                {currentSlide === index && (
                  <motion.img
                    key={`camel-${index}`}
                    src="/bag.png"
                    alt="Camel"
                    initial={{ opacity: 0, x: 150 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ height: "500px" }}
                    exit={{ opacity: 0, x: 150 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                    className="hidden md:block absolute top-[40%] right-[-40%] w-12 md:w-48 lg:w-56 object-contain z-30"
                  />
                )}
              </AnimatePresence> */}
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default CarouselHeader;
