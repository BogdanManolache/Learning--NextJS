'use client';

import { useState } from 'react';

import { LinkIcon } from '@heroicons/react/20/solid';

export default function ShareLinkButton() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setClicked(true);
    setTimeout(() => setClicked(false), 2000);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-1 rounded border px-2 py-1 text-sm text-slate-500 duration-300 hover:bg-orange-100 hover:text-slate-700"
    >
      <LinkIcon className="h-4 w-4" />
      {clicked ? 'Link Copied' : 'Share Link'}
    </button>
  );
}
