import React, { useEffect, useState, useRef } from "react";
import axios from "../../api/axiosConfig";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import getAppLang from "../../utils/getAppLang";

const baseURL = import.meta.env.VITE_API_BASE_URL;


const CitiesStackScroll = () => {
  const { i18n } = useTranslation();
  const lang = getAppLang(i18n.language);
  const [regions, setRegions] = useState([]);
  const [index, setIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const scrollContainer = useRef(null);
  const isScrolling = useRef(false);
  const textContainerRef = useRef(null);

  useEffect(() => {
    axios.get("/regions").then((res) => setRegions(res.data));
  }, []);

  useEffect(() => {
    setActiveImageIndex(0); // При смене города обнуляем активную картинку
  }, [index]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!scrollContainer.current || !textContainerRef.current) return;

      const textEl = textContainerRef.current;
      const isTextScrollable = textEl.scrollHeight > textEl.clientHeight;
      const atTop = textEl.scrollTop === 0;
      const atBottom = Math.abs(textEl.scrollTop + textEl.clientHeight - textEl.scrollHeight) < 1;

      if (isTextScrollable && !(atTop && e.deltaY < 0) && !(atBottom && e.deltaY > 0)) {
        return;
      }

      e.preventDefault();
      if (isScrolling.current) return;

      isScrolling.current = true;
      if (e.deltaY > 30) {
        setIndex((prev) => Math.min(prev + 1, regions.length - 1));
      } else if (e.deltaY < -30) {
        setIndex((prev) => Math.max(prev - 1, 0));
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 700);
    };

    const container = scrollContainer.current;
    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [regions]);

  const transitionVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  const nextCity = () => {
    setIndex((prev) => Math.min(prev + 1, regions.length - 1));
  };

  const prevCity = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="h-screen overflow-hidden bg-white relative">
      <div ref={scrollContainer} className="h-full w-full overflow-y-hidden relative">
        <AnimatePresence mode="wait">
          {regions[index] && (
            <motion.div
              key={regions[index]._id}
              variants={transitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.6 }}
              className="h-screen w-full flex flex-col justify-start items-center relative overflow-hidden"
            >
              {/* Фон основного изображения */}
              <div className="absolute inset-0 z-0">
                {regions[index].images.length > 0 ? (
                  <motion.img
                    key={regions[index].images[activeImageIndex]}
                    src={`${baseURL}${regions[index].images[activeImageIndex]}`}
                    alt={`city-photo-${activeImageIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full object-cover absolute"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200"></div>
                )}
                <div className="absolute inset-0 bg-black/20"></div>
              </div>

              {/* Контент */}
              <div className="z-10 max-w-7xl w-full text-center mt-20 md:mt-24 relative px-4 sm:px-6">
                {/* Навигационные точки */}
                <div className="flex justify-center gap-2 mb-4 md:mb-6">
                  {regions.map((_, i) => (
                    <span
                      key={i}
                      className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                        i === index ? "bg-[#DFAF68] scale-125" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Название города */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                  {regions[index].name[lang]}
                </h2>

                {regions[index].images.length > 1 && (
                <div className="bottom-10 flex gap-2 sm:gap-4 justify-start sm:justify-center w-full z-20 overflow-x-auto no-scrollbar pb-1">
                  {regions[index].images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i)}
                      className={`border-2 rounded-lg overflow-hidden w-16 h-11 sm:w-20 sm:h-14 flex-shrink-0 ${
                        i === activeImageIndex ? "border-[#DFAF68]" : "border-transparent"
                      } transition`}
                    >
                      <img
                        src={`${baseURL}${img}`}
                        alt={`preview-${i}`}
                        style={{ imageRendering: "auto" }}
                        className="w-full h-full will-change-transform rounded-lg cursor-pointer  object-cover object-center"
                      />
                    </button>
                  ))}
                </div>
              )}

                {/* Погода */}
                {regions[index].weather && (
                  <div className="flex justify-center items-center gap-2 text-sm text-white mb-2">
                    <img
                      src={regions[index].weather.icon}
                      alt="weather"
                      className="w-6 h-6"
                    />
                    <span>
                      {Math.round(regions[index].weather.temp)}°C • {regions[index].weather.condition}
                    </span>
                  </div>
                )}

                {/* Обновление */}
                <p className="text-xs text-gray-200 mb-6">
                  Обновлено: {new Date(regions[index].updatedAt).toLocaleDateString()}
                </p>

                {/* Описание */}
                <div
                  ref={textContainerRef}
                  className="max-h-[38vh] md:max-h-[450px] overflow-y-auto p-4 bg-white backdrop-blur-sm rounded-xl text-gray-700 text-sm mx-auto w-full max-w-3xl"
                >
                  {regions[index].description[lang]}
                </div>
              </div>

              {/* Мини-кнопки навигации по городам */}
              <div className="absolute top-1/2 left-2 sm:left-6 transform -translate-y-1/2 z-20">
                <button
                  onClick={prevCity}
                  disabled={index === 0}
                  className="bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md hover:bg-white transition disabled:opacity-50"
                >
                  <FaChevronLeft className="text-gray-600" />
                </button>
              </div>

              <div className="absolute top-1/2 right-2 sm:right-6 transform -translate-y-1/2 z-20">
                <button
                  onClick={nextCity}
                  disabled={index === regions.length - 1}
                  className="bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md hover:bg-white transition disabled:opacity-50"
                >
                  <FaChevronRight className="text-gray-600" />
                </button>
              </div>

              {/* Превью картинок */}
           

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CitiesStackScroll;
