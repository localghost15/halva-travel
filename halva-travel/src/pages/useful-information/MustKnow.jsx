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

const MustKnow = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-screen-xl mx-auto py-12 px-4 space-y-16">
      {/* Intro Section */}
      <motion.section
        className="text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn('up', 0.1)}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('mustknow.title')}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{t('mustknow.intro')}</p>
        <motion.img
          src="/Uzbekistan-3_0.jpg"
          alt="Must Know Uzbekistan"
          className="w-full max-h-[400px] object-cover rounded-2xl mt-8 shadow"
          variants={fadeIn('up', 0.2)}
        />
      </motion.section>

      {/* Visa & Currency */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn('up', 0.2)}
      >
        <h2 className="text-2xl font-semibold mb-4">{t('mustknow.visa_currency.title')}</h2>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div variants={fadeIn('left', 0.1)}>
            <h3 className="text-xl font-semibold mb-2">{t('mustknow.visa_currency.visa.title')}</h3>
            <p className="text-gray-700 leading-7">{t('mustknow.visa_currency.visa.text')}</p>
          </motion.div>
          <motion.div variants={fadeIn('right', 0.1)}>
            <h3 className="text-xl font-semibold mb-2">{t('mustknow.visa_currency.currency.title')}</h3>
            <p className="text-gray-700 leading-7">{t('mustknow.visa_currency.currency.text')}</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Health & Safety */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn('up', 0.3)}
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div variants={fadeIn('left', 0.1)}>
            <h2 className="text-2xl font-semibold mb-4">{t('mustknow.health_safety.title')}</h2>
            <p className="text-gray-700 leading-7">{t('mustknow.health_safety.text')}</p>
            <h2 className="text-2xl font-semibold my-4">{t('mustknow.customs.title')}</h2>
            <p className="text-gray-700 leading-7">{t('mustknow.customs.text')}</p>
          </motion.div>
          <motion.img
            src="/123.jpg"
            alt="Health & Safety"
            className="rounded-xl shadow-md"
            variants={fadeIn('right', 0.2)}
          />
        </div>
      </motion.section>

      {/* Emergency Contacts */}
      <motion.section
        className="bg-[#f9f6f1] p-6 rounded-xl shadow"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn('up', 0.4)}
      >
        <h3 className="text-xl font-semibold mb-4">{t('mustknow.contacts.title')}</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li><strong>{t('mustknow.contacts.police')}:</strong> 102</li>
          <li><strong>{t('mustknow.contacts.ambulance')}:</strong> 103</li>
          <li><strong>{t('mustknow.contacts.fire')}:</strong> 101</li>
          <li><strong>{t('mustknow.contacts.tourist')}:</strong> 1173</li>
        </ul>
      </motion.section>

      {/* CTA */}
      <motion.div
        className="text-center mt-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn('up', 0.3)}
      >
        <h4 className="text-lg font-semibold mb-2">{t('mustknow.cta.title')}</h4>
        <p className="text-gray-600 mb-4">{t('mustknow.cta.text')}</p>
        <a
          href="/transport"
          className="inline-block bg-[#DFAF68] text-white px-6 py-3 rounded-full hover:bg-[#c59b56] transition"
        >
          {t('mustknow.cta.button')}
        </a>
      </motion.div>
    </div>
  );
};

export default MustKnow;
