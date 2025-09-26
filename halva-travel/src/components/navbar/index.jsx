import { AnimatePresence, motion } from "framer-motion";
import { FiPhone } from "react-icons/fi";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MobileMenu from "../MobileMenu";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [lang, setLang] = useState(false);
  const { t, i18n } = useTranslation();

  const langLinks = [
    { label: "Русский", code: "ru", img: "/ru.svg" },
    { label: "English", code: "en", img: "/uk.svg" },
    { label: "O'zbekcha", code: "uz", img: "/uz.svg" },
  ];
  const currentLang = langLinks.find((l) => l.code === i18n.language) || langLinks[0];

  const phones = [
    { plain: "998940072299", formatted: "+998 (94) 007-22-99" },
    // { plain: "998934567455", formatted: "+998 (93) 456-74-55" },
  ];

  return (
    <div className="navbar border-b border-[#f3f0eb] bg-white/80 backdrop-blur-md">
      <div className="navlist layout-container-limit mx-auto flex items-center justify-between py-2">
        {/* Логотип */}
        <NavLink to="/" className="logo">
          <img className="h-[60px]" src="/logo.svg" alt="Halva Travel" />
        </NavLink>

        {/* Правый блок: телефоны + мессенджеры + языки */}
        <div className="hidden md:flex items-center gap-6">
          {/* Телефоны + мессенджеры */}
          <div className="flex flex-col items-end gap-1">
            {phones.map((ph, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <FiPhone className="text-[#535353] text-lg" />
                <a
                  href={`tel:+${ph.plain}`}
                  className="font-medium text-[#2b2b2b] hover:underline"
                >
                  {ph.formatted}
                </a>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${ph.plain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
                    title={`WhatsApp ${ph.formatted}`}
                  >
                    <FaWhatsapp size={14} />
                  </a>
                  <a
                    href={`tg://resolve?phone=${ph.plain}`}
                    className="p-1.5 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition"
                    title={`Telegram ${ph.formatted}`}
                  >
                    <FaTelegramPlane size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Переключатель языка */}
          <div className="relative">
            <button
              onClick={() => setLang(!lang)}
              className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <img src={currentLang.img} alt={currentLang.label} className="w-5 h-5" />
              <span className="text-sm">{currentLang.label}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class=""><path d="M3 6L8 11L13 6" stroke="#535353" stroke-linejoin="round" class=""></path></svg>
            </button>

            <AnimatePresence>
              {lang && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg p-2 z-50"
                >
                  {langLinks.map((link, i) => (
                    <span
                      key={i}
                      onClick={() => {
                        i18n.changeLanguage(link.code);
                        setLang(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 rounded cursor-pointer"
                    >
                      <img src={link.img} alt={link.label} className="w-5 h-5" />
                      {link.label}
                    </span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile menu */}
        <MobileMenu t={t} />
      </div>
    </div>
  );
};

export default Navbar;
