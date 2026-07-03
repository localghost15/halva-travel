import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const fadeIn = (direction = 'up', delay = 0) => ({
  hidden: {
    opacity: 0,
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: 'easeOut',
    },
  },
});

const AboutUzbekistan = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-screen-xl mx-auto py-12 px-4 space-y-16">
      {/* Hero Section */}
      <motion.section
        className="text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn("up", 0.1)}
      >
        <motion.h1 className="text-3xl md:text-4xl font-bold mb-4">{t('about_uz.title')}</motion.h1>
        <motion.p className="text-gray-600 max-w-2xl mx-auto">{t('about_uz.intro')}</motion.p>
        <motion.img
          src="/Registan Square shutterstock_250136662.jpg"
          alt="Uzbekistan Landscape"
          className="w-full max-h-[400px] object-cover rounded-2xl mt-8 shadow"
          variants={fadeIn("up", 0.2)}
        />
      </motion.section>

      {/* History Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn("up", 0.2)}
      >
        <h2 className="text-2xl font-semibold mb-4">{t('about_uz.history.title')}</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.p className="text-gray-700 leading-7" variants={fadeIn("left", 0.1)}>
            {t('about_uz.history.text')}
          </motion.p>
          <motion.img
            src="/Silk-Road-1024x585.webp"
            alt="Samarkand"
            className="rounded-xl max-h-[200px] w-full object-cover shadow-md"
            variants={fadeIn("right", 0.2)}
          />
        </div>
      </motion.section>

      {/* Culture Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn("up", 0.3)}
      >
        <h2 className="text-2xl font-semibold mb-4">{t('about_uz.culture.title')}</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.img
            src="/handicrafts-in-uzbekistan-culture.jpg"
            alt="Uzbek Culture"
            className="rounded-xl max-h-[200px] w-full object-cover shadow-md"
            variants={fadeIn("left", 0.1)}
          />
          <motion.p className="text-gray-700 leading-7" variants={fadeIn("right", 0.2)}>
            {t('about_uz.culture.text')}
          </motion.p>
        </div>
      </motion.section>

      {/* Quick Facts */}
      <motion.section
        className="bg-[#f9f6f1] p-6 rounded-xl shadow"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn("up", 0.4)}
      >
        <h3 className="text-xl font-semibold mb-4">{t('about_uz.facts.title')}</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
          <li><strong>{t('about_uz.facts.capital.label')}:</strong> {t('about_uz.facts.capital.value')}</li>
          <li><strong>{t('about_uz.facts.population.label')}:</strong> {t('about_uz.facts.population.value')}</li>
          <li><strong>{t('about_uz.facts.language.label')}:</strong> {t('about_uz.facts.language.value')}</li>
          <li><strong>{t('about_uz.facts.currency.label')}:</strong> {t('about_uz.facts.currency.value')}</li>
          <li><strong>{t('about_uz.facts.religion.label')}:</strong> {t('about_uz.facts.religion.value')}</li>
          <li><strong>{t('about_uz.facts.unesco.label')}:</strong> {t('about_uz.facts.unesco.value')}</li>
        </ul>
      </motion.section>

      {/* CTA Section */}
      <motion.div
        className="text-center mt-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn("up", 0.2)}
      >
        <h4 className="text-lg font-semibold mb-2">{t('about_uz.explore.title')}</h4>
        <p className="text-gray-600 mb-4">{t('about_uz.explore.text')}</p>
        <a
          href="/cities"
          className="inline-block bg-[#DFAF68] text-white px-6 py-3 rounded-full hover:bg-[#c59b56] transition"
        >
          {t('about_uz.explore.button')}
        </a>
      </motion.div>
    </div>
  );
};

export default AboutUzbekistan;
