'use client';

import { useIsClient } from '@/lib/hooks';
import { Combobox } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

export default function SearchBox() {
  const isClient = useIsClient();
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 300);
  const [reviews, setReviews] = useState([]);
  const router = useRouter();

  useEffect(
    function () {
      if (debouncedQuery.length > 1) {
        const controller = new AbortController();

        (async () => {
          const url = `api/search?query=${encodeURIComponent(debouncedQuery)}`;
          const response = await fetch(url, { signal: controller.signal });
          const reviews = await response.json();
          setReviews(reviews);
        })();
        return () => controller.abort();
      } else {
        setReviews([]);
      }
    },
    [debouncedQuery],
  );

  function handleChange(review) {
    router.push(`/reviews/${review.slug}`);
  }

  // console.log('[SearchBox]: ', { query, debouncedQuery });

  if (!isClient) return null; // workaround for skipping SSR (id server !== id client)

  return (
    <div className="relative w-48">
      <Combobox onChange={handleChange}>
        <Combobox.Input
          type="text"
          placeholder="Search..."
          className="w-full rounded border px-2 py-1"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <Combobox.Options className="absolute w-full cursor-pointer bg-white py-1">
          {reviews.map(review => (
            <Combobox.Option key={review.slug} value={review}>
              {({ active }) => (
                <span
                  className={`block truncate px-2 ${
                    active ? 'bg-orange-100' : ''
                  }`}
                >
                  {review.title}
                </span>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
