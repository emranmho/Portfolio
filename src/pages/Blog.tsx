import { useState, useEffect, useMemo } from 'react';
import { Calendar, Clock, Tag, Search, Filter, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { blogPosts, getAllTags } from '@/data/blogPosts';
import { BlogPost, BlogFilters } from '@/types/blog';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const Blog = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<BlogFilters>({
    search: searchParams.get('search') || '',
    tags: searchParams.get('tags')?.split(',').filter(Boolean) || [],
    sortBy: (searchParams.get('sortBy') as 'date' | 'title' | 'readTime') || 'date',
    sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
  });

  const allTags = getAllTags();
  const postsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = [...blogPosts];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Tag filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter(post =>
        filters.tags.some(tag => post.tags.includes(tag))
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (filters.sortBy) {
        case 'title':
          aValue = a.title;
          bValue = b.title;
          break;
        case 'readTime':
          aValue = parseInt(a.readTime);
          bValue = parseInt(b.readTime);
          break;
        case 'date':
        default:
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [filters]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.tags.length > 0) params.set('tags', filters.tags.join(','));
    if (filters.sortBy !== 'date') params.set('sortBy', filters.sortBy);
    if (filters.sortOrder !== 'desc') params.set('sortOrder', filters.sortOrder);
    
    setSearchParams(params);
  }, [filters, setSearchParams]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
  };

  const handleTagToggle = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleSortChange = (sortBy: 'date' | 'title' | 'readTime') => {
    setFilters(prev => ({
      ...prev,
      sortBy,
      sortOrder: prev.sortBy === sortBy && prev.sortOrder === 'desc' ? 'asc' : 'desc'
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      tags: [],
      sortBy: 'date',
      sortOrder: 'desc'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
                onClick={() => navigate('/')}
                className="btn-ghost-cosmic"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Portfolio
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-glow">Blog</h1>
                <p className="text-sm text-muted-foreground">
                  {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="card-cosmic p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search
              </h3>
              <Input
                placeholder="Search posts..."
                value={filters.search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="bg-background/50 border-border/50 focus:border-primary"
              />
            </div>

            {/* Tags Filter */}
            <div className="card-cosmic p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Tags
              </h3>
              <div className="space-y-2">
                {allTags.map((tag) => (
                  <label key={tag} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.tags.includes(tag)}
                      onChange={() => handleTagToggle(tag)}
                      className="rounded border-border/50 bg-background/50 focus:border-primary"
                    />
                    <span className="text-sm">{tag}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="card-cosmic p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Sort By
              </h3>
              <div className="space-y-2">
                {[
                  { key: 'date', label: 'Date' },
                  { key: 'title', label: 'Title' },
                  { key: 'readTime', label: 'Read Time' }
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => handleSortChange(key as 'date' | 'title' | 'readTime')}
                    className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                      filters.sortBy === key
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'hover:bg-accent/50'
                    }`}
                  >
                    {label}
                    {filters.sortBy === key && (
                      <span className="ml-2 text-xs">
                        {filters.sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {(filters.search || filters.tags.length > 0) && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full btn-ghost-cosmic"
              >
                Clear Filters
              </Button>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Posts Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {paginatedPosts.map((post, index) => (
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
                      {post.tags.length > 2 && (
                        <span className="px-2 py-1 text-xs text-muted-foreground">
                          +{post.tags.length - 2}
                        </span>
                      )}
                    </div>
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="btn-ghost-cosmic"
                >
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page ? "btn-cosmic" : "btn-ghost-cosmic"}
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="btn-ghost-cosmic"
                >
                  Next
                </Button>
              </div>
            )}

            {/* No results */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button onClick={clearFilters} className="btn-cosmic">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog; 