import Link from 'next/link';

function NavBar() {
  return (
    <nav>
      <ul className="flex gap-2">
        <li>
          <Link href="/" className="font-orbitron text-orange-800 duration-300">
            Indie Gamer
          </Link>
        </li>
        <li className="ml-auto">
          <Link
            href="/reviews"
            className=" text-orange-800 duration-300 hover:underline"
          >
            Reviews
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="text-orange-800 duration-300 hover:underline"
            prefetch={false}
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
