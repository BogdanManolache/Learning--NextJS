import { Suspense } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
//
import { getReview, getSlugs } from '@/lib/reviews';
//
import CommentForm from '@/components/CommentForm';
import CommentList from '@/components/CommentList';
import CommentListSkeleton from '@/components/CommentListSkeleton';
import Heading from '@/components/Heading';
import ShareLinkButton from '@/components/ShareLinkButton';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

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
  // await new Promise(resolve => setTimeout(resolve, 3000));

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
      <section className="mt-3 max-w-screen-sm border-t border-dashed py-3">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
          Comments
        </h2>
        <CommentForm title={review.title} slug={slug} />

        <Suspense fallback={<CommentListSkeleton />}>
          <CommentList slug={slug} />
        </Suspense>
      </section>
    </>
  );
}

export default ReviewPage;
