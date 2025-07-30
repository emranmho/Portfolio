import { useEffect, useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from './ui/button';

export const HeroSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-4 text-center z-10">
        <div className={`transition-all duration-1000 ${mounted ? 'fade-in-up visible' : 'fade-in-up'}`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-cosmic-gradient">Hello, I'm</span>
            <br />
            <span className="text-glow">Mohammodullah Emran</span>
          </h1>
          
          <div className="mb-8">
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-float">
              Software Engineer
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm text-accent">
              <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30">React</span>
              <span className="px-3 py-1 rounded-full bg-accent/20 border border-accent/30">TypeScript</span>
              <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30">Node.js</span>
              <span className="px-3 py-1 rounded-full bg-accent/20 border border-accent/30">Three.js</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              onClick={scrollToAbout}
              className="btn-cosmic group"
            >
              Explore My Work
              <ArrowDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
            </Button>
            
            <Button 
              variant="outline" 
              className="btn-ghost-cosmic"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/resume.pdf';
                link.download = 'alex-johnson-resume.pdf';
                link.click();
              }}
            >
              Download Resume
            </Button>
          </div>

          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110 hover:shadow-[var(--glow-primary)]"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border/50 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 hover:scale-110 hover:shadow-[var(--glow-accent)]"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:alex@example.com"
              className="p-3 rounded-full border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110 hover:shadow-[var(--glow-primary)]"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-float" style={{ animationDelay: '0s' }}>
          <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
        </div>
        <div className="animate-float" style={{ animationDelay: '1s' }}>
          <div className="absolute top-40 right-20 w-1 h-1 bg-accent rounded-full animate-pulse-glow" />
        </div>
        <div className="animate-float" style={{ animationDelay: '2s' }}>
          <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-primary rounded-full animate-pulse-glow" />
        </div>
        <div className="animate-float" style={{ animationDelay: '0.5s' }}>
          <div className="absolute bottom-60 right-10 w-1 h-1 bg-accent rounded-full animate-pulse-glow" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={scrollToAbout}
          className="p-2 rounded-full border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
        >
          <ArrowDown className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
};