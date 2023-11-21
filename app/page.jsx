import Link from 'next/link';
import Heading from '@/components/Heading';
import { getFeaturedReview } from '@/lib/reviews';

async function HomePage() {
  const review = await getFeaturedReview();

  return (
    <>
      <Heading>Indie gamer</Heading>
      <p className="pb-3">Only the best indie games, reviewed for you</p>
      <div className=" w-80 rounded border bg-white shadow duration-300 hover:shadow-xl sm:w-full">
        <Link
          href={`/reviews/${review.slug}`}
          className="flex flex-col sm:flex-row"
        >
          <img
            src={review.image}
            alt={`${review.title} poster`}
            width="320"
            height="180"
            className="mb-2 rounded-t sm:mb-0 sm:rounded-l sm:rounded-r-none"
          />
          <h2 className="py-1 text-center font-orbitron font-semibold sm:px-2">
            {review.title}
          </h2>
        </Link>
      </div>
    </>
  );
}

export default HomePage;
