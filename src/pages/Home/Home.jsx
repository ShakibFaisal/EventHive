import React from "react";
import HeroSlider from "../../componets/Home/HeroSlider";
import StatsSection from "../../componets/Home/StatsSection";
import SearchBox from "../../componets/Home/SearchBox";
import FeaturedEvents from "../../componets/Home/FeaturedEvents";
import OrganizerSpotlight from "../../componets/Home/OrganizerSpotlight";
import ReviewSection from "../../componets/Home/ReviewSection";
import FAQSection from "../../componets/Home/FAQSection";
import TrustedPartners from "../../componets/Home/TrustedPartners";
import Newsletter from "../../componets/Home/Newsletter";

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <SearchBox />
      <StatsSection />
      <FeaturedEvents />
      <OrganizerSpotlight />
      <ReviewSection />
      <FAQSection />
      <TrustedPartners />
      <Newsletter />
    </div>
  );
};

export default Home;
