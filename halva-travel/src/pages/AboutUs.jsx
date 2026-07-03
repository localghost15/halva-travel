import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Section = ({ title, description, list }) => (
  <motion.div
    className="bg-white/90 backdrop-blur-sm border border-[#f3f0eb] rounded-2xl p-6 hover:shadow-md transition-all duration-300"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-xl font-semibold text-[#A88856] mb-3 tracking-tight">{title}</h2>
    <p className="text-gray-600 mb-3 text-sm leading-relaxed">{description}</p>
    {list && (
      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-500">
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    )}
  </motion.div>
);

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#2b2b2b] tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {t("about.title")}
      </motion.h1>

      <motion.p
        className="text-center text-base max-w-2xl mx-auto text-gray-500 mb-10 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {t("about.intro")}
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Section
          title={t("about.activityTitle")}
          description={t("about.activityDesc")}
          list={t("about.activityList", { returnObjects: true })}
        />
        <Section
          title={t("about.missionTitle")}
          description={t("about.missionDesc")}
        />
        <Section
          title={t("about.valuesTitle")}
          description={t("about.valuesDesc")}
          list={t("about.valuesList", { returnObjects: true })}
        />
      </div>
    </div>
  );
};

export default AboutUs;
