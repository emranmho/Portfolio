import { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, ExternalLink, Tag } from 'lucide-react';
import { Button } from './ui/button';
import { marked } from 'marked';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
}

export const BlogSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [postContent, setPostContent] = useState<string>('');

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

  // Sample blog posts
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Building Interactive 3D Experiences with Three.js',
      excerpt: 'Exploring the fundamentals of WebGL and Three.js to create immersive web experiences that captivate users.',
      date: '2024-01-15',
      readTime: '8 min read',
      tags: ['Three.js', 'WebGL', 'JavaScript'],
      slug: 'building-3d-experiences-threejs'
    },
    {
      id: '2',
      title: 'The Future of Web Development: WebAssembly and Beyond',
      excerpt: 'Diving deep into WebAssembly and how it\'s revolutionizing performance-critical web applications.',
      date: '2024-01-08',
      readTime: '12 min read',
      tags: ['WebAssembly', 'Performance', 'Web Development'],
      slug: 'future-web-development-webassembly'
    },
    {
      id: '3',
      title: 'Mastering Advanced React Patterns',
      excerpt: 'Advanced patterns and techniques for building scalable React applications with better performance and maintainability.',
      date: '2024-01-01',
      readTime: '10 min read',
      tags: ['React', 'JavaScript', 'Design Patterns'],
      slug: 'mastering-advanced-react-patterns'
    }
  ];

  const loadBlogPost = async (slug: string) => {
    // Simulate loading markdown content
    const mockMarkdown = `# ${selectedPost?.title}

This is a sample blog post content. In a real implementation, this would load from markdown files.

## Introduction

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Code Example

\`\`\`javascript
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
\`\`\`

## Conclusion

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
`;

    try {
      const html = await marked(mockMarkdown);
      setPostContent(html);
    } catch (error) {
      console.error('Error parsing markdown:', error);
      setPostContent('<p>Error loading post content.</p>');
    }
  };

  useEffect(() => {
    if (selectedPost) {
      loadBlogPost(selectedPost.slug);
    }
  }, [selectedPost]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (selectedPost) {
    return (
      <section id="blog" className="py-20 relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button
            variant="outline"
            className="btn-ghost-cosmic mb-8"
            onClick={() => setSelectedPost(null)}
          >
            ← Back to Blog
          </Button>

          <article className="card-cosmic">
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-glow">
                {selectedPost.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(selectedPost.date)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {selectedPost.readTime}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full bg-primary/20 border border-primary/30 text-primary"
                  >
                    <Tag className="h-3 w-3 inline mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: postContent }}
            />
          </article>
        </div>
      </section>
    );
  }

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
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className="card-cosmic card-glow group cursor-pointer fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedPost(post)}
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
          <Button variant="outline" className="btn-ghost-cosmic" asChild>
            <a href="https://blog.example.com" target="_blank" rel="noopener noreferrer">
              View All Posts
            </a>
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