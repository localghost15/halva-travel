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

const Culture = () => {
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
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('culture.title')}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{t('culture.intro')}</p>
        <motion.img
          src="/handicrafts-in-uzbekistan-culture (1).jpg"
          alt="Uzbek Culture"
          className="w-full max-h-[400px] object-cover rounded-2xl mt-8 shadow"
          variants={fadeIn('up', 0.2)}
        />
      </motion.section>

      {/* Traditions Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn('up', 0.2)}
      >
       
        <div className="grid md:grid-cols-2 gap-8 items-center">
       <div>
       <h2 className="text-2xl font-semibold mb-4">{t('culture.traditions.title')}</h2>
          <motion.p className="text-gray-700 leading-7" variants={fadeIn('left', 0.1)}>
            {t('culture.traditions.text')}
          </motion.p>
       </div>
          <motion.img
            src="/souvenirs-banner.jpg"
            alt="Uzbek Traditions"
            className="rounded-xl max-h-[200px] w-full object-cover shadow-md"
            variants={fadeIn('right', 0.2)}
          />
        </div>
      </motion.section>

      {/* Music & Dance Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn('up', 0.3)}
      >
       
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.img
            src="/uzbekistan-culture-dance.jpg"
            alt="Music and Dance"
            className="rounded-xl  max-h-[200px] w-full object-cover shadow-md"
            variants={fadeIn('left', 0.1)}
          />
         <div>
         <h2 className="text-2xl font-semibold mb-4">{t('culture.music.title')}</h2>
          <motion.p className="text-gray-700 leading-7" variants={fadeIn('right', 0.2)}>
            {t('culture.music.text')}
          </motion.p>
         </div>
        </div>
      </motion.section>

      {/* Clothing Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn('up', 0.4)}
      >
       
        <div className="grid md:grid-cols-2 gap-8 items-center">
       <div>
       <h2 className="text-2xl font-semibold mb-4">{t('culture.clothing.title')}</h2>
          <motion.p className="text-gray-700 leading-7" variants={fadeIn('left', 0.1)}>
            {t('culture.clothing.text')}
          </motion.p>
       </div>
          <motion.img
            src="/Kleidung-Frauen.webp"
            alt="Uzbek Clothing"
            className="rounded-xl  max-h-[200px] w-full object-cover object-top shadow-md"
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
        variants={fadeIn('up', 0.2)}
      >
        <h4 className="text-lg font-semibold mb-2">{t('culture.cta.title')}</h4>
        <p className="text-gray-600 mb-4">{t('culture.cta.text')}</p>
        <a
          href="/cuisine"
          className="inline-block bg-[#DFAF68] text-white px-6 py-3 rounded-full hover:bg-[#c59b56] transition"
        >
          {t('culture.cta.button')}
        </a>
      </motion.div>
    </div>
  );
};

export default Culture;
