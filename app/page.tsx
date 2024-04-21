import { Metadata } from 'next';
import Range from '@/components/range/range';
import { Limits, PriceList } from '@/types/common';

async function getPrices() {
  const res = await fetch('http://demo6730669.mockable.io/pricelimit', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const pricesResponse: Limits = await res.json();
  const prices: PriceList = Object.values(pricesResponse);

  return prices;
}

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
  const prices: PriceList = await getPrices();
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-y-4">
      <h1 className="text-xl font-bold text-black">Range component</h1>
      <div className="w-1/2">{prices && <Range prices={prices} />}</div>
    </div>
  );
}
