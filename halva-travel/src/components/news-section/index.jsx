// NewsSection.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import axios from "../../api/axiosConfig";
import { Link } from "react-router-dom";
import getAppLang from "../../utils/getAppLang";

const fadeIn = (direction = "up", delay = 0) => ({
  hidden: {
    opacity: 0,
    y: direction === "up" ? 40 : 0,
    x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
  },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: "easeOut",
    },
  },
});

const NewsSection = () => {
  const { i18n } = useTranslation();
  const currentLang = getAppLang(i18n.language);

  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get("/news").then((res) => setNews(res.data)).catch(console.error);
  }, []);

  const left = news.slice(0, 3);
  const right = news.slice(3, 6);
  const banner = news[0];

  return (
    <section className="bg-[#fff] py-10 px-4 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto">
        <motion.h2
          className="text-2xl md:text-3xl font-bold mb-4"
          initial="hidden"
          whileInView="show"
          variants={fadeIn("up", 0.1)}
          viewport={{ once: true }}
        >
          НОВОСТИ И СОБЫТИЯ
          <div className="w-40 h-[4px] bg-[#DFAF68] mt-2" />
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <motion.div
            className="flex flex-col justify-center cursor-pointer gap-4 md:col-span-1"
            initial="hidden"
            whileInView="show"
            variants={fadeIn("left", 0.2)}
            viewport={{ once: true }}
          >
            {left.map((item, index) => (
              <div key={index} className="border-b border-gray-300/60 pb-3 hover:translate-x-1 transition-all duration-300">
                <div className="flex items-center text-xs text-gray-500 gap-2 mb-1">
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  <span>• Новости</span>
                </div>
                <Link
                  to={`/news/${item.slug}`}
                  className="font-medium text-[15px] text-gray-900 hover:text-[#A88856]"
                >
                  {item.title[currentLang]}
                </Link>
              </div>
            ))}
          </motion.div>

          {banner && (
            <motion.div
              className="relative rounded-2xl h-full md:col-span-3 group overflow-hidden shadow-lg"
              initial="hidden"
              whileInView="show"
              variants={fadeIn("up", 0.4)}
              viewport={{ once: true }}
            >
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${banner.image}`}
                alt={banner.title[currentLang]}
                className="object-cover rounded-2xl w-full h-full max-h-[360px] group-hover:scale-105 transition-all duration-700 ease-in-out"
              />
              <div className="absolute inset-0 transition-all duration-700 ease-in-out p-4 flex flex-col justify-end rounded-2xl bg-gradient-to-t from-[#A88856]/90 via-[#A88856]/40 to-transparent to-60%">
                <div className="flex items-center text-xs text-white gap-2 mb-1">
                  <span>{new Date(banner.createdAt).toLocaleDateString()}</span>
                  <span>• Новости</span>
                </div>
                <Link to={`/news/${banner.slug}`}>
                  <motion.h3
                    className="text-lg font-bold text-white leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {banner.title[currentLang]}
                  </motion.h3>
                  <motion.p
                    className="text-gray-200"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {banner.content[currentLang]}
                  </motion.p>
                </Link>
              </div>
            </motion.div>
          )}

          <motion.div
            className="flex flex-col justify-center gap-4 cursor-pointer md:col-span-1"
            initial="hidden"
            whileInView="show"
            variants={fadeIn("right", 0.3)}
            viewport={{ once: true }}
          >
            {right.map((item, index) => (
              <div key={index} className="border-b border-gray-300/60 pb-3 hover:translate-x-1 transition-all duration-300">
                <div className="flex items-center text-xs text-gray-500 gap-2 mb-1">
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  <span>• Новости</span>
                </div>
                <Link
                  to={`/news/${item.slug}`}
                  className="font-medium text-[15px] text-gray-900 hover:text-[#A88856]"
                >
                  {item.title[currentLang]}
                </Link>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
