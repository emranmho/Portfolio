import { useEffect, useState } from 'react';
import { Calendar, MapPin, ExternalLink, ArrowLeft, Building2, Code2, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

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

const ExperienceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [experience, setExperience] = useState<TimelineItem | null>(null);

  useEffect(() => {
    // Get experience from location state or find by ID
    if (location.state?.experience) {
      setExperience(location.state.experience);
    } else {
      // Fallback: find experience by ID (you could also fetch from an API)
      const experienceData: TimelineItem[] = [
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

      const foundExperience = experienceData.find(exp => exp.id === id);
      if (foundExperience) {
        setExperience(foundExperience);
      } else {
        navigate('/experience');
      }
    }
  }, [id, location.state, navigate]);

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

  const handleBackToExperience = () => {
    navigate('/', { 
      state: { scrollTo: 'experience' } 
    });
  };

  if (!experience) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading experience details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={handleBackToExperience}
            className="mb-6 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Experience
          </Button>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className={`p-4 rounded-lg bg-primary/20 ${getTypeColor(experience.type)}`}>
                {getIcon(experience.type)}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-glow mb-2">
                  {experience.title}
                </h1>
                <p className="text-xl font-semibold text-muted-foreground mb-4">
                  {experience.company}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {experience.period}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {experience.location}
                  </div>
                  {experience.link && (
                    <a
                      href={experience.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:text-glow transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="space-y-8">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-accent mb-4">Description</h2>
              <div className="card-cosmic p-6">
                <p className="text-muted-foreground leading-relaxed">
                  {experience.description}
                </p>
              </div>
            </section>

            {/* Technologies */}
            <section>
              <h2 className="text-2xl font-bold text-accent mb-4">Technologies</h2>
              <div className="card-cosmic p-6">
                <div className="flex flex-wrap gap-3">
                  {experience.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 text-sm rounded-full bg-secondary/50 border border-border/50 text-foreground hover:bg-primary/20 hover:border-primary/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Key Achievements */}
            <section>
              <h2 className="text-2xl font-bold text-accent mb-4">Key Achievements</h2>
              <div className="card-cosmic p-6">
                <ul className="space-y-4">
                  {experience.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-muted-foreground flex items-start gap-4">
                      <span className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handleBackToExperience}
                className="btn-ghost-cosmic"
              >
                ← Back to Experience
              </Button>
              
              <Button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/resume.pdf';
                  link.download = 'mohammodullah-emran-resume.pdf';
                  link.click();
                }}
                className="btn-cosmic"
              >
                Download Full Resume
              </Button>
            </div>
          </div>
        </article>
      </div>

      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-cosmic opacity-10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-cosmic opacity-10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};

export default ExperienceDetail; 