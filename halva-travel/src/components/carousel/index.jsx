import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Carousel } from 'react-responsive-carousel';
import { motion } from 'framer-motion';
import axios from '../../api/axiosConfig';
import { useTranslation } from 'react-i18next'; // добавил
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const TravelCarousel = () => {
  const { t } = useTranslation(); // добавил
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/contact', formData);
      toast.success(t("formSuccess"));
      setFormData({ name: '', phone: '', message: '' });
    } catch (err) {
      toast.error(t("formError"));
      console.error('Ошибка:', err);
    }
  };

  return (
    <div className="w-full max-w-screen-2xl mt-4 mx-auto py-6 px-4">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        showIndicators
        showArrows
      >
        <div className="relative rounded-xl overflow-hidden">
          <img
            src="/1370x440_rixos.jpg"
            alt="Khorezm Climate Resort"
            className="w-full h-[560px] sm:h-[600px] object-cover"
          />

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute max-h-max top-0 left-0 w-[calc(100%-2rem)] md:w-[550px] h-[calc(100%-2rem)] bg-white/90 backdrop-blur-sm rounded-xl m-4 p-5 sm:p-6 shadow-xl flex flex-col justify-center"
          >
            <div className="text-left">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-2xl font-bold text-gray-800 mb-2"
              >
                {t("consultationTitle")}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="text-gray-600 mb-4"
              >
                {t("consultationSubtitle")}
              </motion.p>
            </div>

            {/* Форма */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              onSubmit={handleSubmit}
              className="space-y-3 flex flex-col gap-3"
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("yourName")}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#DFAF68]"
                required
              />
              <input
                type="email"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#DFAF68]"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t("yourQuestion")}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#DFAF68] resize-none"
                rows="3"
                required
              />
              <button
                type="submit"
                className="bg-[#DFAF68] text-white w-full py-3 rounded-xl hover:bg-[#b08c52] transition font-medium"
              >
                {t("sendRequest")}
              </button>
            </motion.form>
          </motion.div>
        </div>
      </Carousel>
    </div>
  );
};

export default TravelCarousel;
