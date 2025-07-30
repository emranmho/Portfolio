import { useEffect, useRef } from 'react';
import { Code2, Rocket, Globe, Zap } from 'lucide-react';
import profileImage from '@/assets/profile.jpg';

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-in-up');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const skills = [
    {
      icon: Code2,
      title: 'Frontend Development',
      description: 'React, TypeScript, Tailwind CSS, Three.js',
      color: 'text-primary'
    },
    {
      icon: Rocket,
      title: 'Backend Development', 
      description: 'Node.js, Python, PostgreSQL, MongoDB',
      color: 'text-accent'
    },
    {
      icon: Globe,
      title: 'Full-Stack Solutions',
      description: 'End-to-end application development',
      color: 'text-primary'
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Speed, scalability, and user experience',
      color: 'text-accent'
    }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in-up">
            <span className="text-cosmic-gradient">About Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto fade-in-up">
            Passionate developer crafting digital experiences that reach for the stars
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Profile Image */}
          <div className="text-center lg:text-left fade-in-up">
            <div className="relative inline-block">
              <div className="w-64 h-64 mx-auto lg:mx-0 rounded-full overflow-hidden border-4 border-primary/30 hover:border-primary/50 transition-all duration-300 hover:shadow-[var(--glow-primary)] hover:scale-105">
                <img
                  src={profileImage}
                  alt="Alex Johnson"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full animate-pulse-glow" />
              <div className="absolute -bottom-4 -left-4 w-4 h-4 bg-accent rounded-full animate-pulse-glow" />
            </div>
          </div>

          {/* About Content */}
          <div className="space-y-6 fade-in-up">
            <h3 className="text-2xl font-bold text-glow">
              Exploring the Digital Universe
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                With over 5 years of experience in full-stack development, I specialize in creating 
                immersive web experiences that push the boundaries of what's possible. My passion 
                lies at the intersection of cutting-edge technology and creative expression.
              </p>
              <p>
                From interactive 3D websites to scalable backend systems, I love tackling complex 
                challenges and turning innovative ideas into reality. When I'm not coding, you'll 
                find me stargazing, exploring new technologies, or contributing to open-source projects.
              </p>
              <p>
                I believe that great software should be both powerful and beautiful, accessible and 
                performant. Every project is an opportunity to learn, grow, and create something 
                extraordinary.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Three.js', 'WebGL', 'GraphQL'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm rounded-full bg-primary/20 border border-primary/30 text-primary hover:bg-primary/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.title}
              className="card-cosmic card-glow group fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`${skill.color} mb-4 group-hover:scale-110 transition-transform`}>
                <skill.icon className="h-8 w-8" />
              </div>
              <h4 className="text-lg font-semibold mb-2 group-hover:text-glow transition-all">
                {skill.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-cosmic opacity-10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-cosmic opacity-10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>
    </section>
  );
};