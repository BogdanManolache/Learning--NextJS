import { ArrowPathIcon } from '@heroicons/react/24/outline';

export default function Loading() {
  return (
    <div className="flex justify-center py-6">
      <ArrowPathIcon className="h-6 w-6 animate-spin text-orange-700" />
    </div>
  );
}
