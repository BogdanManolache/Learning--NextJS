import Heading from '@/components/Heading';
import ShareLinkButton from '@/components/ShareLinkButton';
import { getReview, getSlugs } from '@/lib/reviews';

export async function generateStaticParams() {
  const slugs = await getSlugs();

  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params: { slug } }) {
  const review = await getReview(slug);

  return {
    title: review.title,
  };
}

async function ReviewPage({ params }) {
  const { slug } = params;
  const review = await getReview(slug);

  return (
    <>
      <Heading>{review.title}</Heading>
      <div className="flex items-baseline gap-3">
        <p className="pb-2 italic">{review.date}</p>
        <ShareLinkButton />
      </div>
      <img
        src={review.image}
        alt="Stardew Valley poster"
        width="640"
        height="360"
        className="mb-2 rounded"
      />
      <article
        dangerouslySetInnerHTML={{ __html: review.body }}
        className="prose prose-slate max-w-screen-sm"
      />
    </>
  );
}

export default ReviewPage;