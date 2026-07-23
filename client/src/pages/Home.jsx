import React from "react";

import LandingNavbar from "../components/LandingNavbar";

import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import FeaturesSection from "../components/home/FeaturesSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import WhyChooseSection from "../components/home/WhyChooseSection";
import ReviewsSection from "../components/home/ReviewsSection";
import FAQSection from "../components/home/FAQSection";
import CTASection from "../components/home/CTASection";
import FooterSection from "../components/home/FooterSection";

import { Box } from "@mui/material";

function Home() {
  return (
    <>
      <LandingNavbar />

      <Box
        sx={{
          mt: 8,
          overflow: "hidden",
        }}
      >
        <HeroSection />

        <Box id="features">
          <FeaturesSection />
        </Box>

        <StatsSection />

        <Box id="how-it-works">
          <HowItWorksSection />
        </Box>

        <WhyChooseSection />

        <Box id="testimonials">
          <ReviewsSection />
        </Box>

        <FAQSection />

        <CTASection />

        <FooterSection />
      </Box>
    </>
  );
}

export default Home;