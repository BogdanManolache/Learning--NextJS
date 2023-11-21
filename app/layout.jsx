import NavBar from '../components/NavBar';
import './globals.css';
import { exo2, orbitron } from '@/app/fonts';

export const metadata = {
  title: {
    default: 'Indie Gamer',
    template: 'Indie Gamer | %s',
  },
  description: 'Only the best indie games, reviewed for you',
};

function RootLayout({ children }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${exo2.variable}`}>
      <body className="flex min-h-screen flex-col bg-orange-50 px-4 py-2">
        <header>
          <NavBar />
        </header>
        <main className="grow py-3"> {children}</main>
        <footer className="border-t py-3 text-center text-xs text-slate-500">
          Game data and images courtesy of{' '}
          <a
            href="https://rawg.io/"
            target="_blank"
            className="text-orange-800 duration-300 hover:underline"
          >
            RAWG
          </a>
        </footer>
      </body>
    </html>
  );
}

export default RootLayout;
