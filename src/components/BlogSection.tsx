import { useEffect, useRef } from 'react';
import { Calendar, Clock, ExternalLink, Tag } from 'lucide-react';
import { Button } from './ui/button';
import { blogPosts } from '@/data/blogPosts';
import { useNavigate } from 'react-router-dom';

export const BlogSection = () => {
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

  // Show only the 3 most recent posts in the section
  const recentPosts = blogPosts.slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section ref={sectionRef} id="blog" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fade-in-up">
            <span className="text-cosmic-gradient">Blog</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto fade-in-up">
            Thoughts, tutorials, and insights from my journey through the digital cosmos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {recentPosts.map((post, index) => (
            <article
              key={post.id}
              className="card-cosmic card-glow group cursor-pointer fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(`/blog/${post.slug}`)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded bg-primary/20 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>

              <h3 className="text-xl font-semibold mb-3 group-hover:text-glow transition-all line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(post.date)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            className="btn-ghost-cosmic"
            onClick={() => navigate('/blog')}
          >
            View All Posts
          </Button>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/4 w-36 h-36 bg-gradient-cosmic opacity-5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-1/4 w-28 h-28 bg-gradient-cosmic opacity-5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
    </section>
  );
};