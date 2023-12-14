import Link from 'next/link';
import Heading from '@/components/Heading';
import { getReviews, getSearchableReviews } from '@/lib/reviews';
import Image from 'next/image';
import PaginationBar from '@/components/PaginationBar';
import SearchBox from '@/components/SearchBox';

// export const dynamic = 'force-dynamic';
// export const revalidate = 30;

export const metadata = {
  title: 'Reviews',
};

const PAGE_SIZE = 6;

async function ReviewsPage({ searchParams }) {
  const page = parsePageParam(searchParams.page);

  const { reviews, pageCount } = await getReviews(PAGE_SIZE, page);
  console.log('[Reviews Page] rendering: ', page);

  // const searchableReviews = await getSearchableReviews();

  return (
    <>
      <Heading>Reviews</Heading>
      <div className="flex items-center justify-between pb-3">
        <PaginationBar page={page} pageCount={pageCount} href="/reviews" />
        <SearchBox />
      </div>
      <ul className="flex flex-wrap justify-center gap-3">
        {reviews.map((review, index) => (
          <li
            className="w-80 rounded border bg-white shadow duration-300 hover:shadow-xl"
            key={review.slug}
          >
            <Link href={`/reviews/${review.slug}`}>
              <Image
                src={review.image}
                alt={`${review.title} poster`}
                width="320"
                height="180"
                className="mb-2 rounded-t"
                priority={index === 0}
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

function parsePageParam(paramValue) {
  if (paramValue) {
    const page = Number.parseInt(paramValue);
    if (Number.isFinite(page) && page > 0) {
      return page;
    }
  }
  return 1;
}
