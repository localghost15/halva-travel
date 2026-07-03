import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const fadeIn = (direction = 'up', delay = 0) => ({
  hidden: {
    opacity: 0,
    y: direction === 'up' ? 40 : 0,
    x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
  },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: 'easeOut',
    },
  },
});

const Cuisine = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-screen-xl mx-auto py-12 px-4 space-y-16">
      {/* Hero Section */}
      <motion.section
        className="text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn('up', 0.1)}
      >
        <motion.h1 className="text-3xl md:text-4xl font-bold mb-4">{t('cuisine.title')}</motion.h1>
        <motion.p className="text-gray-600 max-w-2xl mx-auto">{t('cuisine.intro')}</motion.p>
        <motion.img
          src="/1588674897008.jpeg"
          alt="Uzbek Cuisine"
          className="w-full max-h-[400px] object-cover rounded-2xl mt-8 shadow"
          variants={fadeIn('up', 0.2)}
        />
      </motion.section>

      {/* National Dishes */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn('up', 0.2)}
      >
        <h2 className="text-2xl font-semibold mb-6">{t('cuisine.dishes.title')}</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.p className="text-gray-700 leading-7" variants={fadeIn('left', 0.1)}>
            {t('cuisine.dishes.text')}
          </motion.p>
          <motion.img
            src="/Uzbek-Plov.jpg"
            alt="Plov"
            className="rounded-xl max-h-[200px] w-full object-cover shadow-md"
            variants={fadeIn('right', 0.2)}
          />
        </div>
      </motion.section>

      {/* Bread and Pastries */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn('up', 0.3)}
      >
       
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.img
            src="/BoF2K1690181642.jpg"
            alt="Bread"
            className="rounded-xl max-h-[200px] w-full object-cover shadow-md"
            variants={fadeIn('left', 0.1)}
          />
          <div>
          <h2 className="text-2xl font-semibold mb-6">{t('cuisine.bread.title')}</h2>
          <motion.p className="text-gray-700 leading-7" variants={fadeIn('right', 0.2)}>
            {t('cuisine.bread.text')}
          </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Sweets and Tea */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn('up', 0.4)}
      >
       
        <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
      <h2 className="text-2xl font-semibold mb-6">{t('cuisine.sweets.title')}</h2>
          <motion.p className="text-gray-700 leading-7" variants={fadeIn('left', 0.1)}>
            {t('cuisine.sweets.text')}
          </motion.p>
      </div>
          <motion.img
            src="/traditional-uzbek-sweets-dried-apricot-rohat-turkish-delight-raisin-samsa-almond-teapot-tea-bowl-national-ornament-145229264.webp"
            alt="Tea and Sweets"
            className="rounded-xl max-h-[200px] w-full object-cover shadow-md"
            variants={fadeIn('right', 0.2)}
          />
        </div>
      </motion.section>

      {/* CTA */}
      <motion.div
        className="text-center mt-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn('up', 0.3)}
      >
        <h4 className="text-lg font-semibold mb-2">{t('cuisine.cta.title')}</h4>
        <p className="text-gray-600 mb-4">{t('cuisine.cta.text')}</p>
        <a
          href="/tours"
          className="inline-block bg-[#DFAF68] text-white px-6 py-3 rounded-full hover:bg-[#c59b56] transition"
        >
          {t('cuisine.cta.button')}
        </a>
      </motion.div>
    </div>
  );
};

export default Cuisine;
