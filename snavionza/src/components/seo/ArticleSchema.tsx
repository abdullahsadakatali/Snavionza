import { Post } from '@/lib/types';
import { siteConfig } from '@/lib/utils/seo';

interface ArticleSchemaProps {
  post: Post;
}

export default function ArticleSchema({ post }: ArticleSchemaProps) {
  const publishDate = post.published_at || post.created_at;
  const imageUrl = post.featured_image || siteConfig.defaultImage;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.meta_description || post.excerpt || '',
    image: imageUrl,
    datePublished: publishDate,
    dateModified: post.updated_at,
    author: {
      '@type': 'Organization',
      name: 'Snavionza Editorial',
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Snavionza',
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${post.slug}`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteConfig.url}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${siteConfig.url}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
