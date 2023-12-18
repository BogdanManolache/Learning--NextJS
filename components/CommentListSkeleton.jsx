import { UserCircleIcon } from '@heroicons/react/24/outline';

export default function CommentListSkeleton() {
  return (
    <ul className="mt-3 animate-pulse rounded border">
      {[1, 2, 3].map((_, index) => (
        <li
          key={index}
          className="border-b px-3 py-2 last:border-none odd:bg-orange-100"
        >
          <div className="flex items-center gap-3 pb-1 ">
            <div className="h-6 w-6 rounded-full bg-slate-300" />
            <div className="h-3 w-24 rounded bg-slate-300" />
          </div>
          <p className="py-1">
            <div className="h-3 w-2/3 rounded bg-slate-300" />
          </p>
        </li>
      ))}
    </ul>
  );
}
