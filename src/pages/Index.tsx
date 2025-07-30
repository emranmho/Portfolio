import { useEffect } from 'react';
import { ThreeBackground } from '@/components/ThreeBackground';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { BlogSection } from '@/components/BlogSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { RippleEffect } from '@/components/RippleEffect';
import { useScrollEffects } from '@/hooks/useScrollEffects';

const Index = () => {
  useScrollEffects();

  useEffect(() => {
    // Set dark theme as default
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Three.js animated background */}
      <ThreeBackground />
      
      {/* Mouse ripple effects */}
      <RippleEffect />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <BlogSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
