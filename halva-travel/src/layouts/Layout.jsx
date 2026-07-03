import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion";
import Navbar from '../components/navbar'

const Layout = () => {
  const { t } = useTranslation();
  const [showSticky, setShowSticky] = useState(false);
  const triggerRef = useRef(null);
  const [rates, setRates] = useState({ USD: null, EUR: null });
  const [infoOpen, setInfoOpen] = useState(false);
  const [promoOpen, setPromoOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setShowSticky(offset > 100); 
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const infoLinks = [
    { label: t("dropdown.about_uzbekistan"), href: "/about-uzbekistan" },
    { label: t("dropdown.cities"), href: "/cities" },
    { label: t("dropdown.hotels"), href: "/hotels" },
    { label: t("dropdown.transport"), href: "/transport" },
    { label: t("dropdown.must_know"), href: "/must-know" },
    { label: t("dropdown.culture"), href: "/culture" },
    { label: t("dropdown.cuisine"), href: "/cuisine" },
  ];
  
  const promoLinks = [
    { label: t("dropdown.early_booking"), href: "/early_booking" },
    { label: t("dropdown.off_season"), href: "#" },
  ];

  // Закрытие при клике вне обоих меню
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setInfoOpen(false);
        setPromoOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/UZS")
      .then((res) => res.json())
      .then((data) => {
        setRates({
          USD: (1 / data.rates.USD).toFixed(2),
          EUR: (1 / data.rates.EUR).toFixed(2),
        });
      })
      .catch((err) => console.error("Ошибка при загрузке курса валют:", err));
  }, []);


  return (
    <div className="relative">
        <Navbar/>
        <div>
       <div className='max-w-screen-2xl mx-auto h-[66px] hidden lg:flex gap-[27px] justify-center items-center'>
          <Link className='font-medium text-sm' to='/about-us'>{t("aboutTitle")}</Link>
          <Link className='font-medium text-sm' to='/tours'>{t("tours")}</Link>
          <div className="flex space-x-4 relative z-50" ref={containerRef}>
      {/* Меню "Полезная информация" */}
      <div className="relative inline-block text-left">
        <div
          className="promo-bubble cursor-pointer flex items-center space-x-2"
          onClick={() => {
            setInfoOpen(!infoOpen);
            setPromoOpen(false);
          }}
        >
          <div className="icon">
            <div className="icon-text">
              <img src="/dots.svg" alt="info" />
            </div>
          </div>
          <div className="text">
            <p className="text-sm">{t("info")}</p>
          </div>
        </div>

        <AnimatePresence>
          {infoOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 mt-2 w-full bg-white  rounded-2xl menu-fixed p-2"
            >
              {infoLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 rounded"
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Меню "Акции" */}
      <div className="relative inline-block text-left">
        <Link
        to='/early_booking'
          className="promo-bubble cursor-pointer flex items-center space-x-2"
          // onClick={() => {
          //   setPromoOpen(!promoOpen);
          //   setInfoOpen(false);
          // }}
        >
          <div className="icon">
            <div className="icon-text">
              <img src="/price.svg" alt="promo" />
            </div>
          </div>
          <div className="text">
            <p className="text-sm">{t("promotions")}</p>
          </div>
        </Link>

        <AnimatePresence>
          {promoOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 mt-2 w-56 bg-white  rounded-2xl menu-fixed p-2"
            >
              {promoLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 rounded"
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
          <Link className='font-medium text-sm' to='/news'>{t("news")}</Link>
          <Link className='font-medium text-sm' to='/faq'>FAQ</Link>
          <Link className='font-medium text-sm' to='/contact'>{t("contacts")}</Link>
          <Link className='font-medium text-sm' to='/testimonials'>{t("testimonials")}</Link>
        </div>
       </div>
        <AnimatePresence>
      {showSticky && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 w-full bg-white z-50 shadow-md"
        >
          <Navbar />
          <div className="max-w-screen-2xl mx-auto h-[66px] hidden justify-center lg:flex gap-[27px] items-center">
            <Link className="font-medium text-sm" to="/about-us">{t("aboutTitle")}</Link>
            <Link className="font-medium text-sm" to="/tours">{t("tours")}</Link>

            <div className="flex space-x-4 relative z-50" ref={containerRef}>
              {/* Меню info */}
              <div className="relative inline-block text-left">
                <div
                  className="promo-bubble cursor-pointer flex items-center space-x-2"
                  onClick={() => {
                    setInfoOpen(!infoOpen);
                    setPromoOpen(false);
                  }}
                >
                  <div className="icon"><img src="/dots.svg" alt="info" /></div>
                  <div className="text"><p className="text-sm">{t("info")}</p></div>
                </div>
                <AnimatePresence>
                  {infoOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-full bg-white rounded-2xl menu-fixed p-2"
                    >
                      {infoLinks.map((link, i) => (
                        <a key={i} href={link.href} className="block px-4 py-2 text-sm hover:bg-gray-100">
                          {link.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Меню promotions */}
              <div className="relative inline-block text-left">
              <Link
        to='/early_booking'
          className="promo-bubble cursor-pointer flex items-center space-x-2"
          // onClick={() => {
          //   setPromoOpen(!promoOpen);
          //   setInfoOpen(false);
          // }}
        >
          <div className="icon">
            <div className="icon-text">
              <img src="/price.svg" alt="promo" />
            </div>
          </div>
          <div className="text">
            <p className="text-sm">{t("promotions")}</p>
          </div>
        </Link>
                <AnimatePresence>
                  {promoOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-56 bg-white rounded-2xl menu-fixed p-2"
                    >
                      {promoLinks.map((link, i) => (
                        <a key={i} href={link.href} className="block px-4 py-2 text-sm hover:bg-gray-100">
                          {link.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <Link className="font-medium text-sm" to="/news">{t("news")}</Link>
            <Link className="font-medium text-sm" to="/faq">FAQ</Link>
            <Link className="font-medium text-sm" to="/contact">{t("contacts")}</Link>
            <Link className="font-medium text-sm" to="/testimonials">{t("testimonials")}</Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
        <Outlet />

        <footer className="bg-white relative text-gray-700 pt-10 ">
          <img src="/camels.svg" className="hidden md:block absolute h-16 bottom-20 w-full" alt="" />
      <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 pb-10">
        {/* Колонка 1 */}
        <div>
  <h3 className="font-medium mb-4">Компания</h3>
  <ul className="space-y-2 text-sm">
    <li><a className="text-xs hover:underline" href="/about-us">О Halva Travel</a></li>
    <li><a className="text-xs hover:underline" href="/testimonials">Благодарности</a></li>
    <li><a className="text-xs hover:underline" href="/testimonials">Оставить отзыв</a></li>
  </ul>
</div>

{/* Колонка 2 */}
<div>
  <h3 className="font-medium mb-4">Бронирование туров</h3>
  <ul className="space-y-2 text-sm">
    <li><a className="text-xs hover:underline" href="/contact">Контакты</a></li>
    <li><a className="text-xs hover:underline" href="/early_booking">Акции</a></li>
  </ul>
</div>

{/* Колонка 3 */}
<div>
  <h3 className="font-medium mb-4">Популярные направления</h3>
  <ul className="space-y-2 text-sm">
    <li><a className="text-xs hover:underline" href="/cities">Бухара</a></li>
    <li><a className="text-xs hover:underline" href="/cities">Ташкент</a></li>
    <li><a className="text-xs hover:underline" href="/cities">Самарканд</a></li>
    <li><a className="text-xs hover:underline" href="/cities">Навои</a></li>
    <li><a className="text-xs hover:underline" href="/cities">Андижан</a></li>
    <li><a className="text-xs hover:underline" href="/cities">Хорезм</a></li>
  </ul>
</div>

        {/* Колонка 4 */}
        <div>
          <h3 className="font-medium mb-4">Подпишитесь на наши рассылки:</h3>
          <p className="text-sm mb-4">Получайте лучшие и самые выгодные предложения!</p>
          <div className="form_email">
  <div className="form_input sm-custom-subscribe_input">
    <input
      className="form-control"
      name="sm-form-email"
      placeholder="Введите E-mail"
      required=""
      type="email"
    />{" "}
    <button type="submit" className="flex items-center justify-center">
      {" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={31}
        height={25}
        viewBox="0 0 31 25"
        fill="none"
      >
        {" "}
        <g clipPath="url(#clip0_959_304)">
          {" "}
          <path
            d="M0.583984 12.76H25.9174"
            stroke="white"
            strokeWidth={3}
          />{" "}
          <path
            d="M17.916 3.42601L27.2494 12.7593L17.916 22.0926"
            stroke="white"
            strokeWidth={3}
            strokeLinejoin="round"
          />{" "}
        </g>{" "}
        <defs>
          {" "}
          <clipPath id="clip0_959_304">
            {" "}
            <rect
              width={30}
              height={24}
              fill="white"
              transform="translate(0.0600586 0.759995)"
            />{" "}
          </clipPath>{" "}
        </defs>{" "}
      </svg>{" "}
    </button>
  </div>
</div>

       
          <p className="text-xs text-gray-500 mb-4">
            Нажимая «Подписаться» вы даёте согласие на обработку персональных данных
          </p>
          {/* <div className="flex items-center space-x-4 text-sm text-blue-500 mb-4">
            <span>Email</span>
            <span>ВКонтакте</span>
            <span>Telegram</span>
            <span>Турагент</span>
          </div> */}
          <div className="bg-[#A88856]/10 text-[#A88856] flex items-center space-x-3 px-4 py-2 rounded-full w-fit mb-4 text-sm">
            <span className="flex gap-3 font-medium items-center"> 
              <svg width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.9287 20.9799V14.9729C30.9287 12.0521 29.7698 9.2509 27.7069 7.18557C25.644 5.12025 22.8461 3.95996 19.9287 3.95996C17.0113 3.95996 14.2134 5.12025 12.1505 7.18557C10.0876 9.2509 8.92871 12.0521 8.92871 14.9729V20.9799C8.92871 23.9007 10.0876 26.7019 12.1505 28.7673C14.2134 30.8326 17.0113 31.9929 19.9287 31.9929C22.8461 31.9929 25.644 30.8326 27.7069 28.7673C29.7698 26.7019 30.9287 23.9007 30.9287 20.9799ZM16.2187 24.2738C16.3117 24.18 16.4223 24.1055 16.5441 24.0547C16.666 24.0038 16.7967 23.9777 16.9287 23.9777C17.0607 23.9777 17.1914 24.0038 17.3133 24.0547C17.4351 24.1055 17.5457 24.18 17.6387 24.2738C17.9389 24.5759 18.2957 24.8156 18.6887 24.9792C19.0817 25.1428 19.5031 25.227 19.9287 25.227C20.3543 25.227 20.7757 25.1428 21.1687 24.9792C21.5617 24.8156 21.9186 24.5759 22.2187 24.2738C22.407 24.0853 22.6624 23.9794 22.9287 23.9794C23.195 23.9794 23.4504 24.0853 23.6387 24.2738C23.827 24.4623 23.9328 24.718 23.9328 24.9846C23.9328 25.2513 23.827 25.5069 23.6387 25.6955C20.1687 29.1295 14.5787 25.9157 16.2187 24.2738Z" fill="#A88856"></path><path d="M35.9287 12.9706H34.7887C34.2947 9.37617 32.5176 6.0823 29.786 3.69795C27.0543 1.3136 23.5528 0 19.9287 0C16.3047 0 12.8031 1.3136 10.0715 3.69795C7.33979 6.0823 5.5627 9.37617 5.06871 12.9706H3.92871C3.13306 12.9706 2.37 13.2871 1.80739 13.8503C1.24478 14.4136 0.928711 15.1776 0.928711 15.9741V21.9812C0.928711 22.7778 1.24478 23.5417 1.80739 24.105C2.37 24.6683 3.13306 24.9847 3.92871 24.9847H6.92871C7.19393 24.9847 7.44828 24.8792 7.63582 24.6915C7.82335 24.5037 7.92871 24.2491 7.92871 23.9835V13.9718C7.9318 13.7318 7.84868 13.4987 7.6945 13.315C7.54032 13.1312 7.32534 13.009 7.08871 12.9706C7.57286 9.90973 9.13203 7.12224 11.4858 5.10955C13.8395 3.09685 16.8333 1.99106 19.9287 1.99106C23.0241 1.99106 26.0179 3.09685 28.3717 5.10955C30.7254 7.12224 32.2846 9.90973 32.7687 12.9706C32.5321 13.009 32.3171 13.1312 32.1629 13.315C32.0087 13.4987 31.9256 13.7318 31.9287 13.9718V23.9835C31.9287 24.2491 32.0341 24.5037 32.2216 24.6915C32.4091 24.8792 32.6635 24.9847 32.9287 24.9847C32.9295 27.5588 32.0297 30.0518 30.3855 32.0307C28.7414 34.0096 26.4569 35.3494 23.9287 35.8174C23.9728 35.4632 23.9409 35.1036 23.8353 34.7626C23.7296 34.4217 23.5527 34.1072 23.3161 33.84C23.0796 33.5729 22.7889 33.3593 22.4635 33.2134C22.138 33.0676 21.7853 32.9928 21.4287 32.9941H19.4287C18.7657 32.9941 18.1298 33.2578 17.6609 33.7272C17.1921 34.1966 16.9287 34.8332 16.9287 35.4971C16.9287 36.1609 17.1921 36.7975 17.6609 37.2669C18.1298 37.7363 18.7657 38 19.4287 38H21.9287C25.3765 38 28.6831 36.6287 31.1211 34.1879C33.5591 31.7471 34.9287 28.4366 34.9287 24.9847H35.9287C36.7244 24.9847 37.4874 24.6683 38.05 24.105C38.6126 23.5417 38.9287 22.7778 38.9287 21.9812V15.9741C38.9287 15.1776 38.6126 14.4136 38.05 13.8503C37.4874 13.2871 36.7244 12.9706 35.9287 12.9706Z" fill="#A88856"></path></svg>
               +998 (94) 007-22-99</span>
          </div>
          <div className="flex items-center space-x-4 text-sm">
        <span className="flex items-center gap-3"><img src="/usd.png" alt="" /> {rates.USD || "Загрузка..."}</span>
        <span className="flex items-center gap-3"><img src="/eur.png" alt="" /> {rates.EUR || "Загрузка..."}</span>
      </div>
        </div>
      </div>
      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
        <div className="flex flex-wrap justify-center gap-6 mb-2">
          <span className="h-6">2025 © Halvatravel.com. Все права защищены</span>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Layout