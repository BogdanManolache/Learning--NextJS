import Link from 'next/link';
import Heading from '@/components/Heading';
import { getReviews } from '@/lib/reviews';

export const metadata = {
  title: 'Reviews',
};

async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <>
      <Heading>Reviews</Heading>
      <ul className="flex flex-wrap justify-center gap-3">
        {reviews.map(review => (
          <li
            className="w-80 rounded border bg-white shadow duration-300 hover:shadow-xl"
            key={review.slug}
          >
            <Link href={`/reviews/${review.slug}`}>
              <img
                src={review.image}
                alt={`${review.title} poster`}
                width="320"
                height="180"
                className="mb-2 rounded-t"
              />
              <h2 className="py-1 text-center font-orbitron font-semibold">
                {review.title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ReviewsPage;
