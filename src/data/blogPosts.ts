import { BlogPost } from '@/types/blog';

export const blogPosts: BlogPost[] = [
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
  },
  {
    id: '4',
    title: 'Microservices Architecture Best Practices',
    excerpt: 'A comprehensive guide to designing, implementing, and maintaining scalable microservices architectures.',
    date: '2023-12-20',
    readTime: '15 min read',
    tags: ['Microservices', 'Architecture', 'Backend', 'Scalability'],
    slug: 'microservices-architecture-best-practices'
  },
  {
    id: '5',
    title: 'Database Optimization Strategies',
    excerpt: 'Learn advanced techniques for optimizing database performance, query tuning, and indexing strategies.',
    date: '2023-12-15',
    readTime: '11 min read',
    tags: ['Database', 'Performance', 'SQL', 'Optimization'],
    slug: 'database-optimization-strategies'
  },
  {
    id: '6',
    title: 'API Design Principles and Best Practices',
    excerpt: 'Essential principles for designing clean, maintainable, and user-friendly RESTful APIs.',
    date: '2023-12-10',
    readTime: '9 min read',
    tags: ['API Design', 'REST', 'Backend', 'Best Practices'],
    slug: 'api-design-principles-best-practices'
  },
  {
    id: '7',
    title: 'Event-Driven Architecture Patterns',
    excerpt: 'Exploring event-driven patterns, message queues, and building reactive systems.',
    date: '2023-12-05',
    readTime: '13 min read',
    tags: ['Event-Driven', 'Architecture', 'Message Queues', 'Reactive'],
    slug: 'event-driven-architecture-patterns'
  },
  {
    id: '8',
    title: 'Security Best Practices for Backend Development',
    excerpt: 'Essential security measures and best practices for protecting your backend applications.',
    date: '2023-11-30',
    readTime: '14 min read',
    tags: ['Security', 'Backend', 'Authentication', 'Authorization'],
    slug: 'security-best-practices-backend-development'
  },
  {
    id: '9',
    title: 'Containerization with Docker and Kubernetes',
    excerpt: 'A practical guide to containerizing applications and orchestrating them with Kubernetes.',
    date: '2023-11-25',
    readTime: '16 min read',
    tags: ['Docker', 'Kubernetes', 'DevOps', 'Containers'],
    slug: 'containerization-docker-kubernetes'
  }
];

export const getAllTags = (): string[] => {
  const tagSet = new Set<string>();
  blogPosts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
}; 