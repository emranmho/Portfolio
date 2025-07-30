import { useEffect, useRef } from 'react';
import { Calendar, MapPin, ExternalLink, Building2, Code2, Rocket } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

interface TimelineItem {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
  type: 'work' | 'education' | 'project';
  link?: string;
}

export const TimelineSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

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

  const timelineData: TimelineItem[] = [
    {
      id: '1',
      title: 'Senior Backend Developer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      period: '2023 - Present',
      description: 'Leading backend development for scalable microservices architecture, implementing event-driven systems, and mentoring junior developers.',
      technologies: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
      achievements: [
        'Reduced API response time by 60% through optimization and caching strategies',
        'Implemented CI/CD pipeline reducing deployment time by 80%',
        'Mentored 5 junior developers and conducted technical interviews'
      ],
      type: 'work',
      link: 'https://techcorp.com'
    },
    {
      id: '2',
      title: 'Full Stack Developer',
      company: 'InnovateTech',
      location: 'New York, NY',
      period: '2021 - 2023',
      description: 'Developed and maintained full-stack applications using modern technologies, focusing on user experience and performance optimization.',
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'GraphQL', 'TypeScript'],
      achievements: [
        'Built 3 major features that increased user engagement by 40%',
        'Optimized database queries resulting in 50% faster page loads',
        'Collaborated with design team to implement responsive UI components'
      ],
      type: 'work',
      link: 'https://innovatetech.com'
    },
    {
      id: '3',
      title: 'Backend Developer',
      company: 'StartupHub',
      location: 'Austin, TX',
      period: '2020 - 2021',
      description: 'Developed RESTful APIs and database schemas for a fast-growing startup, focusing on scalability and maintainability.',
      technologies: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Celery', 'Docker'],
      achievements: [
        'Designed and implemented 15+ REST APIs serving 100K+ users',
        'Set up monitoring and logging infrastructure',
        'Participated in agile development process with 2-week sprints'
      ],
      type: 'work',
      link: 'https://startuphub.com'
    },
    {
      id: '4',
      title: 'Bachelor of Computer Science',
      company: 'University of Technology',
      location: 'Boston, MA',
      period: '2016 - 2020',
      description: 'Graduated with honors, focusing on software engineering, algorithms, and data structures.',
      technologies: ['Java', 'Python', 'C++', 'SQL', 'Data Structures', 'Algorithms'],
      achievements: [
        'Graduated with 3.8 GPA and Dean\'s List recognition',
        'Completed capstone project on distributed systems',
        'Participated in ACM programming competitions'
      ],
      type: 'education'
    },
    {
      id: '5',
      title: 'Open Source Contributor',
      company: 'Various Projects',
      location: 'Remote',
      period: '2019 - Present',
      description: 'Active contributor to open source projects, focusing on developer tools and web frameworks.',
      technologies: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Git', 'GitHub'],
      achievements: [
        'Contributed to 10+ open source projects',
        'Maintained popular npm packages with 50K+ downloads',
        'Helped new contributors through documentation and code reviews'
      ],
      type: 'project',
      link: 'https://github.com'
    }
  ];

  const getIcon = (type: TimelineItem['type']) => {
    switch (type) {
      case 'work':
        return <Building2 className="h-5 w-5" />;
      case 'education':
        return <Code2 className="h-5 w-5" />;
      case 'project':
        return <Rocket className="h-5 w-5" />;
      default:
        return <Building2 className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: TimelineItem['type']) => {
    switch (type) {
      case 'work':
        return 'text-primary';
      case 'education':
        return 'text-accent';
      case 'project':
        return 'text-green-400';
      default:
        return 'text-primary';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleExperienceClick = (item: TimelineItem) => {
    navigate(`/experience/${item.id}`, { 
      state: { experience: item } 
    });
  };

  return (
    <section ref={sectionRef} id="experience" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in-up">
            <span className="text-cosmic-gradient">Experience Timeline</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto fade-in-up">
            My journey through the digital cosmos - from education to professional experience
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-accent/50 to-primary/50 transform -translate-x-1/2 hidden md:block" />
          
          <div className="space-y-8">
            {timelineData.map((item, index) => (
              <div
                key={item.id}
                className={`relative fade-in-up ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex flex-col md:flex-row items-center gap-6`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 top-6 w-4 h-4 bg-background border-4 border-primary rounded-full transform -translate-x-1/2 z-10 hidden md:block" />
                
                {/* Content */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-6' : 'md:pl-6'}`}>
                  <div 
                    className="card-cosmic card-glow group hover:scale-105 transition-all duration-300 cursor-pointer"
                    onClick={() => handleExperienceClick(item)}
                  >
                    <div className="p-4">
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg bg-primary/20 ${getTypeColor(item.type)}`}>
                          {getIcon(item.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-glow group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm font-semibold text-muted-foreground">
                            {item.company}
                          </p>
                        </div>
                      </div>

                      {/* Meta info */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {item.period}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {item.location}
                        </div>
                      </div>

                      {/* Brief description */}
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.description}
                      </p>

                      {/* Click hint */}
                      <div className="mt-3 text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                        Click for more details →
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spacer for mobile */}
                <div className="w-full md:hidden">
                  <div className="h-6" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16 fade-in-up">
          <Button 
            variant="outline" 
            className="btn-ghost-cosmic"
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/resume.pdf';
              link.download = 'mohammodullah-emran-resume.pdf';
              link.click();
            }}
          >
            Download Full Resume
          </Button>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-gradient-cosmic opacity-10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-1/4 w-24 h-24 bg-gradient-cosmic opacity-10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>
    </section>
  );
}; 