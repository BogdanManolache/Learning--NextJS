import Heading from '@/components/Heading';
import ShareLinkButton from '@/components/ShareLinkButton';
import { getReview, getSlugs } from '@/lib/reviews';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const slugs = await getSlugs();

  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params: { slug } }) {
  const review = await getReview(slug);

  if (!review) notFound();

  return {
    title: review.title,
  };
}

async function ReviewPage({ params: { slug } }) {
  console.log('[Review page] rendering: ', slug);
  const review = await getReview(slug);

  if (!review) notFound();

  return (
    <>
      <Heading>{review.title}</Heading>
      <p className="pb-3 font-semibold">{review.subtitle}</p>
      <div className="flex items-baseline gap-3">
        <p className="pb-2 italic">{review.date}</p>
        <ShareLinkButton />
      </div>
      <Image
        src={review.image}
        alt={`${review.title} poster`}
        width="640"
        height="360"
        className="mb-2 rounded"
        priority
      />
      <article
        dangerouslySetInnerHTML={{ __html: review.body }}
        className="prose prose-slate max-w-screen-sm"
      />
    </>
  );
}

export default ReviewPage;
