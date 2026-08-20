import { DatabaseState, Article, TaxonomyItem } from '../types';

export type SearchResult = {
  id: string;
  type: 'article' | 'taxonomy';
  title: string;
  excerpt?: string;
  url: string;
  authorId?: string;
  tags?: string[];
  readTime?: number;
};

export function performGlobalSearch(db: DatabaseState, query: string): SearchResult[] {
  if (!query || query.trim() === '') return [];
  
  const q = query.toLowerCase().trim();
  const results: SearchResult[] = [];
  
  // Search Articles
  if (db.articles) {
    db.articles.forEach((article: Article) => {
      // Only search published articles for public search
      if (article.status === 'PUBLISHED' || article.status === 'APPROVED') {
        const matchesTitle = article.title.toLowerCase().includes(q);
        const matchesExcerpt = article.excerpt?.toLowerCase().includes(q);
        const matchesTags = article.tags?.some(tag => tag.toLowerCase().includes(q));
        
        // Match author
        const author = db.users?.find(u => u.id === article.authorId);
        const matchesAuthor = author?.name.toLowerCase().includes(q);
        
        if (matchesTitle || matchesExcerpt || matchesTags || matchesAuthor) {
          results.push({
            id: article.id,
            type: 'article',
            title: article.title,
            excerpt: article.excerpt,
            url: `/article/${article.id}`,
            authorId: article.authorId,
            tags: article.tags,
            readTime: article.readTime,
          });
        }
      }
    });
  }
  
  // Search Taxonomy (Categories / Tags)
  if (db.taxonomy) {
    db.taxonomy.forEach((tax: TaxonomyItem) => {
      if (tax.name.toLowerCase().includes(q)) {
        results.push({
          id: tax.id,
          type: 'taxonomy',
          title: tax.name,
          excerpt: `Browse topics related to ${tax.name}`,
          url: `/search?q=${encodeURIComponent(tax.name)}`, // Redirects to search for this tag
          tags: [tax.type]
        });
      }
    });
  }
  
  return results;
}
