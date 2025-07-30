export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
  content?: string;
}

export interface BlogFilters {
  search: string;
  tags: string[];
  sortBy: 'date' | 'title' | 'readTime';
  sortOrder: 'asc' | 'desc';
} 