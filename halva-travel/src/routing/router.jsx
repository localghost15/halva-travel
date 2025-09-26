import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../layouts/Layout'
import Home from '../pages/homepage'
import Tour from '../pages/tour'
import NewsDetails from '../pages/news/news-detail'
import AboutUzbekistan from '../pages/useful-information/AboutUzbekistan'
import Cities from '../pages/useful-information/Cities'
import Hotels from '../pages/useful-information/Hotels'
import Transport from '../pages/useful-information/Transport'
import MustKnow from '../pages/useful-information/MustKnow'
import Culture from '../pages/useful-information/Culture'
import Cuisine from '../pages/useful-information/Cuisine'
import Tours from '../pages/Tours'
import AboutUs from '../pages/AboutUs'
import NewsPage from '../pages/NewsPage'
import EarlyBooking from '../pages/EarlyBooking'
import PromotionsPage from '../pages/PromotionsPage'
import FaqSection from '../pages/FaqSection'
import ContactPage from '../pages/ContactPage'
import ReviewsPage from '../pages/ReviewsPage'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/tours/:slug" element={<Tour />} />
          <Route path="/news/:slug" element={<NewsDetails />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/early_booking" element={<PromotionsPage />} />
          <Route path="/testimonials" element={<ReviewsPage />} />
          <Route path="/about-uzbekistan" element={<AboutUzbekistan />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/faq" element={<FaqSection />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/transport" element={<Transport />} />
          <Route path="/must-know" element={<MustKnow />} />
          <Route path="/culture" element={<Culture />} />
          <Route path="/cuisine" element={<Cuisine />} />
          <Route path="/tours" element={<Tours />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
