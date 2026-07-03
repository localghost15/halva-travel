import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight } from "react-icons/fi";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

const MobileMenu = ({ t }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { i18n } = useTranslation();

  // Блокируем прокрутку страницы, пока меню открыто
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const infoLinks = [
    { label: t("dropdown.about_uzbekistan"), href: "/about-uzbekistan" },
    { label: t("dropdown.cities"), href: "/cities" },
    { label: t("dropdown.hotels"), href: "/hotels" },
    { label: t("dropdown.transport"), href: "/transport" },
    { label: t("dropdown.must_know"), href: "/must-know" },
    { label: t("dropdown.culture"), href: "/culture" },
    { label: t("dropdown.cuisine"), href: "/cuisine" },
  ];

  const primaryLinks = [
    { label: t("aboutTitle"), href: "/about-us" },
    { label: t("tours"), href: "/tours" },
    { label: t("promotions"), href: "/early_booking" },
    { label: t("news"), href: "/news" },
    { label: "FAQ", href: "/faq" },
    { label: t("contacts"), href: "/contact" },
    { label: t("testimonials"), href: "/testimonials" },
  ];

  const langLinks = [
    { label: "Русский", code: "ru", img: "/ru.svg" },
    { label: "English", code: "en", img: "/uk.svg" },
    { label: "O'zbekcha", code: "uz", img: "/uz.svg" },
  ];

  const close = () => setMenuOpen(false);

  const panelVariants = {
    hidden: { clipPath: "inset(0% 0% 100% 0%)" },
    visible: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      clipPath: "inset(0% 0% 100% 0%)",
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const listContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
    exit: {},
  };

  const lineReveal = {
    hidden: { y: "115%" },
    visible: { y: "0%", transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] } },
    exit: { y: "115%", transition: { duration: 0.3 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
  };

  return (
    <div className="lg:hidden">
      {/* Кнопка открытия меню */}
      <button
        onClick={() => setMenuOpen(true)}
        aria-label="Открыть меню"
        className="p-2 focus:outline-none cursor-pointer"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M3 6.5h18" stroke="#2b2b2b" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M3 12h13" stroke="#2b2b2b" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M3 17.5h18" stroke="#2b2b2b" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      {createPortal(
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[9999] flex h-[100dvh] flex-col overflow-hidden bg-[#faf7f2]"
            >
            {/* Декоративное свечение */}
            <div className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-[#DFAF68]/25 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-[#A88856]/15 blur-[100px]" />

            {/* Шапка */}
            <div className="relative flex items-center justify-between px-5 pt-5 pb-4">
              <motion.div variants={fadeUp} initial="hidden" animate="visible">
                <Link to="/" onClick={close}>
                  <img className="h-11" src="/logo.svg" alt="Halva Travel" />
                </Link>
              </motion.div>

              <motion.button
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                onClick={close}
                aria-label="Закрыть меню"
                whileTap={{ scale: 0.9, rotate: 90 }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#A88856]/25 bg-white/70 text-[#2b2b2b] backdrop-blur-sm transition hover:bg-[#A88856] hover:text-white cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.button>
            </div>

            {/* Прокручиваемая область */}
            <div className="relative flex-1 overflow-y-auto overscroll-contain px-5 pb-6">
              {/* Основные ссылки */}
              <motion.nav
                variants={listContainer}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-2 flex flex-col"
              >
                {primaryLinks.map((link, i) => (
                  <Link
                    key={link.href + i}
                    to={link.href}
                    onClick={close}
                    className="group relative flex items-center justify-between border-b border-black/5 py-3"
                  >
                    <span className="flex items-baseline gap-3 overflow-hidden">
                      <motion.span
                        variants={lineReveal}
                        className="block text-[11px] font-semibold tabular-nums text-[#A88856]/70"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </motion.span>
                      <span className="block overflow-hidden">
                        <motion.span
                          variants={lineReveal}
                          className="block text-[26px] font-bold leading-none tracking-tight text-[#1f1c19] transition-colors duration-300 group-hover:text-[#A88856] group-active:text-[#A88856]"
                        >
                          {link.label}
                        </motion.span>
                      </span>
                    </span>
                    <motion.span
                      variants={fadeUp}
                      className="text-[#A88856] opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                    >
                      <FiArrowUpRight size={20} />
                    </motion.span>
                  </Link>
                ))}
              </motion.nav>

              {/* Полезная информация */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ delay: 0.35 }}
                className="mt-7"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A88856]">
                    {t("info")}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-[#A88856]/40 to-transparent" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {infoLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={close}
                      className="rounded-full border border-[#A88856]/20 bg-white/60 px-4 py-2 text-sm font-medium text-[#3a352f] backdrop-blur-sm transition active:scale-95 hover:border-[#A88856] hover:bg-[#A88856] hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Нижний блок: контакты, соцсети, язык */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ delay: 0.45 }}
              className="relative border-t border-black/5 bg-white/50 px-5 py-5 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <a
                  href="tel:+998940072299"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#A88856] px-4 py-3 text-sm font-semibold text-white shadow-sm transition active:scale-95 hover:bg-[#96774a]"
                >
                  +998 94 007 22 99
                </a>
                <a
                  href="https://wa.me/998940072299"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white transition active:scale-95 hover:bg-green-600"
                >
                  <FaWhatsapp size={18} />
                </a>
                <a
                  href="tg://resolve?phone=998940072299"
                  aria-label="Telegram"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 text-white transition active:scale-95 hover:bg-sky-600"
                >
                  <FaTelegramPlane size={18} />
                </a>
              </div>

              <div className="mt-4 flex items-center gap-2">
                {langLinks.map((link) => {
                  const active = i18n.language === link.code;
                  return (
                    <button
                      key={link.code}
                      onClick={() => {
                        i18n.changeLanguage(link.code);
                      }}
                      className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition active:scale-95 ${
                        active
                          ? "border-[#A88856] bg-[#A88856] text-white"
                          : "border-[#A88856]/20 bg-white/70 text-[#3a352f] hover:border-[#A88856]"
                      }`}
                    >
                      <img src={link.img} alt={link.label} className="h-4 w-4 rounded-full object-cover" />
                      {link.code.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default MobileMenu;
