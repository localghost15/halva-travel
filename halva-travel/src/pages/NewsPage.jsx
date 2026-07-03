import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import axios from "../api/axiosConfig";
import { motion } from "framer-motion";
import PageLoader from "../components/Loader";
import getAppLang from "../utils/getAppLang";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const NewsCard = ({ item, lang }) => {
  return (
    <motion.div
      key={item._id}
      className="bg-white rounded-2xl transition-all duration-300 overflow-hidden flex flex-col h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/news/${item.slug}`} className="flex flex-col h-full">
        <img
          src={`${baseURL}/uploads/${item.image}`}
          alt={item.title?.[lang]}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="p-4 flex flex-col flex-grow">
          <div className="text-xs text-gray-500 mb-1">
            {new Date(item.createdAt).toLocaleDateString()}
          </div>
          <h4 className="text-base font-semibold text-gray-800 hover:text-[#A88856] line-clamp-2">
            {item.title?.[lang]}
          </h4>
          <p className="text-xs line-clamp-3 text-gray-500 mt-2 flex-grow">
            {item.content?.[lang]}
          </p>
          <span className="mt-3 text-sm text-[#A88856] font-medium hover:underline">
            Подробнее →
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

const NewsPage = () => {
  const { i18n, t } = useTranslation();
  const lang = getAppLang(i18n.language);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/news")
      .then((res) => setNews(res.data))
      .catch((err) => console.error("Ошибка при загрузке новостей:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-screen-3xl mx-auto px-4 py-10 md:py-16">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10 text-[#2b2b2b]">
        {t("newsPageTitle")}
      </h1>

      {loading ? (
        <PageLoader isLoading />
      ) : (
        <div className="grid grid-cols-1 bg-[#A88856]/10 rounded-2xl p-4 sm:p-8 md:p-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {news.map((item) => (
            <NewsCard key={item._id} item={item} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsPage;
