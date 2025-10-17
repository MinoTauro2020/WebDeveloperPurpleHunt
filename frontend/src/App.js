import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import MethodologySection from "./components/MethodologySection";
import APTGroupsSection from "./components/APTGroupsSection";
import ThreatNewsSection from "./components/ThreatNewsSection";
import GlossarySection from "./components/GlossarySection";
import TestimonialsContactFooter from "./components/TestimonialsContactFooter";

const Home = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <HeroSection />
      <ServicesSection />
      <MethodologySection />
      <APTGroupsSection />
      <ThreatNewsSection />
      <GlossarySection />
      <TestimonialsContactFooter />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Toaster position="top-right" theme="dark" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
