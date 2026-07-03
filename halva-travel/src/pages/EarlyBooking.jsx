import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import TourCard from "../components/tour-card";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Select, Input, Button } from "antd";
import PageLoader from "../components/Loader";

const { Option } = Select;

const EarlyBooking = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";

  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [regions, setRegions] = useState([]);
  const [hotels, setHotels] = useState([]);

  const [filters, setFilters] = useState({
    region: null,
    hotel: null,
    search: ""
  });

  useEffect(() => {
    axios.get("/regions").then((res) => setRegions(res.data));
    axios.get("/hotels").then((res) => setHotels(res.data));
    fetchTours(); // начальная загрузка
  }, []);

  const fetchTours = () => {
    setLoading(true);
    axios
      .get("/tours/special-offers", {
        params: {
          region: filters.region,
          hotel: filters.hotel,
          search: filters.search,
          titleLang: lang
        }
      })
      .then((res) => setTours(res.data))
      .catch((err) => console.error("Ошибка загрузки туров:", err))
      .finally(() => setLoading(false));
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-screen-4xl mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">{t("toursPageTitle")}</h1>

      {/* ФИЛЬТРЫ */}
      {/* <div className="bg-white mb-6 p-6 rounded-xl  max-w-3xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
        <Select
        size="large"
          placeholder={t("selectRegion")}
          value={filters.region}
          onChange={(value) => handleFilterChange("region", value)}
          allowClear
          style={{ minWidth: 200 }}
        >
          {regions.map((region) => (
            <Option key={region._id} value={region._id}>
              {region.name?.[lang]}
            </Option>
          ))}
        </Select>

        <Select
        size="large"
          placeholder={t("selectHotel")}
          value={filters.hotel}
          onChange={(value) => handleFilterChange("hotel", value)}
          allowClear
          style={{ minWidth: 200 }}
        >
          {hotels.map((hotel) => (
            <Option key={hotel._id} value={hotel._id}>
              {hotel.name?.[lang]}
            </Option>
          ))}
        </Select>

        <Input
        size="large"
          placeholder={t("searchByName")}
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          style={{ minWidth: 200 }}
        />

  <button  onClick={fetchTours}
                      className="bg-[#DFAF68] cursor-pointer text-white px-3 py-3 rounded-xl text-sm hover:bg-[#b08c52] transition"
                     
                    >
                    {t("filter")}
                    </button>

      </div> */}

      {loading ? (
        <PageLoader isLoading={loading} />
      ) : (
        <div className="grid grid-cols-1 bg-[#A88856]/10 rounded-2xl p-4 sm:p-8 md:p-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {tours.map((tour) => (
            <motion.div
              key={tour._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <TourCard tour={tour} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EarlyBooking;
