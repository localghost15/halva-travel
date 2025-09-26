// src/pages/ContactPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import axios from "../api/axiosConfig";

const BRAND_COLOR = "#A88856";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay },
});

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", contactType: "email", contactValue: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contactValue.trim() || !formData.message.trim()) {
      toast.error("Заполните все поля");
      return;
    }
    try {
      setLoading(true);
      await axios.post("/contact", formData);
      toast.success("Спасибо! Мы свяжемся с вами.");
      setFormData({ name: "", contactType: "phone", contactValue: "", message: "" });
    } catch {
      toast.error("Ошибка при отправке. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#faf8f5]">
      <div className="max-w-screen-lg mx-auto px-4 py-14">
        <motion.h1
          {...fade(0)}
          className="text-3xl md:text-4xl font-bold text-center tracking-tight"
          style={{ color: "#2b2b2b" }}
        >
          Свяжитесь с нами
        </motion.h1>
        <motion.p {...fade(0.05)} className="text-center text-gray-500 mt-2">
          Мы ответим как можно скорее.
        </motion.p>

        {/* Контактные данные */}
        <motion.div {...fade(0.1)} className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-[#f3f0eb] rounded-2xl p-6">
            <div className="text-sm text-gray-500 mb-1">Телефоны</div>
            <a href="tel:+998940072299" className="block font-semibold text-[#2b2b2b] hover:underline">
              +998 94 007 22 99
            </a>
            <a href="tel:+998934567455" className="block font-semibold text-[#2b2b2b] hover:underline">
              +998 93 456 74 55
            </a>
          </div>

          <div className="bg-white border border-[#f3f0eb] rounded-2xl p-6">
            <div className="text-sm text-gray-500 mb-1">Email</div>
            <a href="mailto:info@halvatravel.com" className="font-semibold text-[#2b2b2b] hover:underline">
              info@halvatravel.com
            </a>
          </div>

          <div className="bg-white border border-[#f3f0eb] rounded-2xl p-6">
            <div className="text-sm text-gray-500 mb-1">Адрес</div>
            <div className="font-semibold text-[#2b2b2b]">
              200118, Узбекистан, г. Бухара, ул. Саррофон, д. 10
            </div>
          </div>
        </motion.div>

        {/* Форма */}
        <motion.div {...fade(0.15)} className="mt-6 bg-white border border-[#f3f0eb] rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4" style={{ color: BRAND_COLOR }}>
            Отправить запрос
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Ваше имя</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Иван Петров"
                className="w-full px-3 py-2 rounded-xl border border-[#f3f0eb] bg-white outline-none focus:ring-2 focus:ring-[#A88856]/30"
                required
              />
            </div>

            {/* Выбор способа связи */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Способ связи</label>
              <select
                name="contactType"
                value={formData.contactType}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-[#f3f0eb] bg-white outline-none focus:ring-2 focus:ring-[#A88856]/30"
              >
                <option value="email">Email</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>

            {/* Поле ввода в зависимости от выбора */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                {formData.contactType === "phone"
                  ? "Телефон"
                  : formData.contactType === "email"
                  ? "Email"
                  : "WhatsApp"}
              </label>
              <input
                type={formData.contactType === "email" ? "email" : "text"}
                name="contactValue"
                value={formData.contactValue}
                onChange={handleChange}
                placeholder={
                  formData.contactType === "phone"
                    ? "+998 94 000 00 00"
                    : formData.contactType === "email"
                    ? "example@mail.com"
                    : "+998 94 000 00 00"
                }
                className="w-full px-3 py-2 rounded-xl border border-[#f3f0eb] bg-white outline-none focus:ring-2 focus:ring-[#A88856]/30"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Ваш вопрос</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Кратко опишите ваш запрос"
                rows={4}
                className="w-full px-3 py-2 rounded-xl border border-[#f3f0eb] bg-white outline-none focus:ring-2 focus:ring-[#A88856]/30"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full md:w-auto inline-flex items-center justify-center rounded-xl px-5 py-2.5 font-semibold text-white transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#A88856] hover:bg-[#987447]"}
              `}
            >
              {loading ? "Отправка…" : "Отправить"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
