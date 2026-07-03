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

const Transport = () => {
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
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('transport.title')}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{t('transport.intro')}</p>
        <motion.img
          src="/654082fce26fe.jpg"
          alt="Uzbekistan Train"
          className="w-full max-h-[400px] object-cover object-bottom rounded-2xl mt-8 shadow"
          variants={fadeIn("up", 0.2)}
        />
      </motion.section>

      {/* Types of Transport */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn("up", 0.2)}
      >
        <h2 className="text-2xl font-semibold mb-4">{t('transport.types.title')}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.ul className="space-y-4 text-gray-700 leading-7" variants={fadeIn("left", 0.2)}>
            <li><strong>{t('transport.types.train')}</strong> – {t('transport.types.train_desc')}</li>
            <li><strong>{t('transport.types.taxi')}</strong> – {t('transport.types.taxi_desc')}</li>
            <li><strong>{t('transport.types.metro')}</strong> – {t('transport.types.metro_desc')}</li>
            <li><strong>{t('transport.types.bus')}</strong> – {t('transport.types.bus_desc')}</li>
            <li><strong>{t('transport.types.car')}</strong> – {t('transport.types.car_desc')}</li>
          </motion.ul>
          <motion.img
            src="/bigstock-bukhara-railway-station-330000163-640x360-1.webp"
            alt="Transport Types"
            className="rounded-xl shadow-md"
            variants={fadeIn("right", 0.2)}
          />
        </div>
      </motion.section>

      {/* Travel Tips */}
      <motion.section
        className="bg-[#f9f6f1] p-6 rounded-xl shadow"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn("up", 0.3)}
      >
        <h3 className="text-xl font-semibold mb-4">{t('transport.tips.title')}</h3>
        <ul className="list-disc list-inside text-gray-700 leading-7 space-y-2">
          <li>{t('transport.tips.tip1')}</li>
          <li>{t('transport.tips.tip2')}</li>
          <li>{t('transport.tips.tip3')}</li>
          <li>{t('transport.tips.tip4')}</li>
        </ul>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn("up", 0.3)}
      >
        <h2 className="text-2xl font-semibold mb-4">{t('transport.benefits.title')}</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          {[
            { icon: "speed.svg", text: t('transport.benefits.fast') },
            { icon: "economy.svg", text: t('transport.benefits.affordable') },
            { icon: "comfort.svg", text: t('transport.benefits.comfort') }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="p-4 bg-white shadow rounded-xl"
              variants={fadeIn("up", 0.1 * (idx + 1))}
            >
              <img src={`/icons/${item.icon}`} alt={item.text} className="mx-auto mb-3 h-12" />
              <p className="font-medium">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.div
        className="text-center mt-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn("up", 0.3)}
      >
        <h4 className="text-lg font-semibold mb-2">{t('transport.cta.title')}</h4>
        <p className="text-gray-600 mb-4">{t('transport.cta.text')}</p>
        <a
          href="/tours"
          className="inline-block bg-[#DFAF68] text-white px-6 py-3 rounded-full hover:bg-[#c59b56] transition"
        >
          {t('transport.cta.button')}
        </a>
      </motion.div>
    </div>
  );
};

export default Transport;
