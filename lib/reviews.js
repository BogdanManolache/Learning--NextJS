import { readFile, readdir } from 'node:fs/promises';
import { marked } from 'marked';
import matter from 'gray-matter';

export async function getFeaturedReview() {
  const reviews = await getReviews();

  return reviews[0];
}

export async function getReview(slug) {
  const text = await readFile(`./content/reviews/${slug}.md`, 'utf8');
  const {
    content,
    data: { title, date, image },
  } = matter(text);

  const body = marked(content);

  return { slug, title, date, image, body };
}

export async function getSlugs() {
  const files = await readdir('./content/reviews', 'utf8');
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => file.slice(0, -'.md'.length));
}

export async function getReviews() {
  const reviews = [];

  const slugs = await getSlugs();
  for (let slug of slugs) {
    const review = await getReview(slug);
    reviews.push(review);
  }

  reviews.sort((a, b) => b.date.localeCompare(a.date));

  return reviews;
}
