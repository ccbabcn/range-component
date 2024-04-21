import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Range Component',
  description: 'Next.js Range Component',
  keywords: 'range component, next.js, typescript',
  authors: [
    { name: 'Cristian Bermudez Agudelo', url: 'https://github.com/ccbabcn' },
  ],
  creator: 'Cristian Bermudez Agudelo',
  icons: '/favicon.ico',
};
export default async function Page() {
  // const prices: PriceList = await getPrices();
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800">
        Welcome to the main page
      </h1>
      <Link href="/exercise1">Go to Exercise 1</Link>
    </div>
  );
}
