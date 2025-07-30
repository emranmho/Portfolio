import { useEffect, useState } from 'react';
import { Calendar, Clock, Tag, ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPostBySlug, blogPosts } from '@/data/blogPosts';
import { BlogPost } from '@/types/blog';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { marked } from 'marked';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [postContent, setPostContent] = useState<string>('');
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (slug) {
      const foundPost = getPostBySlug(slug);
      if (foundPost) {
        setPost(foundPost);
        loadPostContent(foundPost);
        loadRelatedPosts(foundPost);
      } else {
        navigate('/blog', { replace: true });
      }
    }
  }, [slug, navigate]);

  const loadPostContent = async (post: BlogPost) => {
    // Simulate loading markdown content
    const mockMarkdown = `# ${post.title}

This is a sample blog post content for "${post.title}". In a real implementation, this would load from markdown files or a CMS.

## Introduction

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

## Main Content

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Code Example

\`\`\`javascript
// Example code block
function example() {
  console.log("Hello, World!");
  return "Success";
}
\`\`\`

## Key Points

- **Point 1**: Important information about the topic
- **Point 2**: Another crucial aspect to consider
- **Point 3**: Final thoughts and recommendations

## Conclusion

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

---

*This post was written to demonstrate the blog functionality. In a real implementation, this would contain actual technical content and insights.*
`;

    try {
      const html = await marked(mockMarkdown);
      setPostContent(html);
    } catch (error) {
      console.error('Error parsing markdown:', error);
      setPostContent('<p>Error loading post content.</p>');
    }
  };

  const loadRelatedPosts = (currentPost: BlogPost) => {
    // Find posts with similar tags
    const related = blogPosts
      .filter(p => p.id !== currentPost.id)
      .filter(p => p.tags.some(tag => currentPost.tags.includes(tag)))
      .slice(0, 3);

    // If not enough related posts, add some recent ones
    if (related.length < 3) {
      const recent = blogPosts
        .filter(p => p.id !== currentPost.id && !related.find(r => r.id === p.id))
        .slice(0, 3 - related.length);
      related.push(...recent);
    }

    setRelatedPosts(related);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-2">Loading...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/blog')}
                className="btn-ghost-cosmic"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-glow">Blog Post</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-glow">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(post.date)}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
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

          {/* Article Content */}
          <article className="card-cosmic mb-12">
            <div
              className="prose prose-invert max-w-none p-6"
              dangerouslySetInnerHTML={{ __html: postContent }}
            />
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-6 text-glow">Related Posts</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <article
                    key={relatedPost.id}
                    className="card-cosmic card-glow group cursor-pointer"
                    onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex flex-wrap gap-1">
                        {relatedPost.tags.slice(0, 2).map((tag) => (
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

                    <h3 className="text-lg font-semibold mb-3 group-hover:text-glow transition-all line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {relatedPost.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(relatedPost.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {relatedPost.readTime}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-8 border-t border-border/50">
            <Button
              variant="outline"
              onClick={() => navigate('/blog')}
              className="btn-ghost-cosmic"
            >
              ← Back to All Posts
            </Button>
            
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="btn-ghost-cosmic"
              >
                ← Back to Portfolio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage; 