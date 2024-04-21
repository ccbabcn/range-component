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
export default async function Page() {
  const prices: PriceList = await getPrices();

  return (
    <main className="flex flex-col gap-y-10">
      <h1 className="text-xl font-bold text-slate-800">
        Range component exercise 1
      </h1>
      <p className="text-slate-500">
        This version of the exercise lets the user set a new price limit between
        a minimum and maximum given by the server.
      </p>
      <div className="w-full">{prices && <Range prices={prices} />}</div>
    </main>
  );
}
