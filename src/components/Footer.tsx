import { Heart } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 text-red-500 animate-pulse" /> by Alex Johnson
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            © {currentYear} All rights reserved. Built with React, Three.js, and cosmic inspiration.
          </p>
        </div>
      </div>
    </footer>
  );
};