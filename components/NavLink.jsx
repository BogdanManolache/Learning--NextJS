'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ children, href, prefetch }) {
  const pathname = usePathname();

  if (pathname === href)
    return <span className="text-orange-800">{children}</span>;

  return (
    <Link
      href={href}
      prefetch={prefetch}
      className=" text-orange-800 duration-300"
    >
      {children}
    </Link>
  );
}
