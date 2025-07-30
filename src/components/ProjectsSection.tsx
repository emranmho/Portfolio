import { useEffect, useRef } from 'react';
import { ExternalLink, Github, Star, Database, Server, Code2 } from 'lucide-react';
import { Button } from './ui/button';

export const ProjectsSection = () => {
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

  const projects = [
    {
      title: 'Microservices Architecture Platform',
      description: 'Scalable microservices platform with service discovery, load balancing, and distributed tracing using Docker and Kubernetes.',
      tech: ['Node.js', 'Docker', 'Kubernetes', 'Redis', 'PostgreSQL'],
      github: 'https://github.com',
      featured: true,
      stars: 127
    },
    {
      title: 'Real-time Analytics API',
      description: 'High-performance analytics API with real-time data processing, caching strategies, and horizontal scaling capabilities.',
      tech: ['Python', 'FastAPI', 'Apache Kafka', 'Elasticsearch', 'MongoDB'],
      github: 'https://github.com',
      featured: false,
      stars: 89
    },
    {
      title: 'Authentication & Authorization Service',
      description: 'Secure authentication system with JWT tokens, OAuth2 integration, role-based access control, and audit logging.',
      tech: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'JWT'],
      github: 'https://github.com',
      featured: true,
      stars: 156
    },
    {
      title: 'Data Pipeline Orchestration',
      description: 'ETL pipeline system with Apache Airflow for data processing, transformation, and loading across multiple data sources.',
      tech: ['Python', 'Apache Airflow', 'Apache Spark', 'PostgreSQL', 'AWS S3'],
      github: 'https://github.com',
      featured: false,
      stars: 203
    },
    {
      title: 'RESTful API Gateway',
      description: 'API gateway with rate limiting, request/response transformation, authentication middleware, and comprehensive monitoring.',
      tech: ['Node.js', 'Express', 'Redis', 'Prometheus', 'Grafana'],
      github: 'https://github.com',
      featured: false,
      stars: 78
    },
    {
      title: 'Event-Driven Architecture System',
      description: 'Event-driven microservices with message queues, event sourcing, CQRS pattern, and distributed event processing.',
      tech: ['Node.js', 'Apache Kafka', 'EventStore', 'MongoDB', 'Docker'],
      github: 'https://github.com',
      featured: true,
      stars: 145
    }
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section ref={sectionRef} id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in-up">
            <span className="text-cosmic-gradient">Featured Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto fade-in-up">
            A collection of backend systems and APIs that demonstrate scalable architecture and robust engineering
          </p>
        </div>

        {/* Featured Projects */}
        <div className="space-y-12 mb-16">
          {featuredProjects.map((project, index) => (
            <div
              key={project.title}
              className={`grid lg:grid-cols-2 gap-8 items-center fade-in-up ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Project Icon/Visual */}
              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="aspect-video rounded-xl bg-gradient-cosmic p-1 hover:shadow-[var(--glow-primary)] transition-all duration-300 group">
                  <div className="w-full h-full rounded-lg bg-background/80 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Server className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">Backend System</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className={`space-y-4 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="flex items-center gap-2 text-sm text-accent">
                  <Star className="h-4 w-4" />
                  Featured Project
                </div>
                <h3 className="text-2xl font-bold text-glow">{project.title}</h3>
                <p className="text-muted-foreground">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-secondary/50 border border-border/50 text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm" className="btn-ghost-cosmic" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-3 w-3" />
                    {project.stars}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects Grid */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4 fade-in-up">
            Other Backend Projects
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <div
              key={project.title}
              className="card-cosmic card-glow group fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                  <Code2 className="h-5 w-5 text-primary" />
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-3 w-3" />
                  {project.stars}
                </div>
              </div>

              <h4 className="text-lg font-semibold mb-2 group-hover:text-glow transition-all">
                {project.title}
              </h4>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {project.tech.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs rounded bg-secondary/50 text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="px-2 py-1 text-xs text-muted-foreground">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded hover:bg-primary/10 transition-colors"
                >
                  <Github className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="btn-ghost-cosmic" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-10 w-40 h-40 bg-gradient-cosmic opacity-5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-gradient-cosmic opacity-5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      </div>
    </section>
  );
};
