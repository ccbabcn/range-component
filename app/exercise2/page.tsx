import Range from '@/components/range/range';
import { PriceList, RangeValues } from '@/types/common';
async function getPrices() {
  const res = await fetch('http://demo6730669.mockable.io/pricerange', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const pricesResponse: RangeValues = await res.json();
  const prices: PriceList = pricesResponse.rangeValues;

  return prices;
}
export default async function Page() {
  const prices: PriceList = await getPrices();

  return (
    <main className="flex flex-col gap-y-10">
      <h1 className="text-xl font-bold text-slate-800">
        Range component exercise 2
      </h1>
      <p className="text-slate-500">
        This version of the exercise only lets the user select the limits
        between fixed values from an array of prices given by the server.
      </p>
      <div className="w-full">{prices && <Range prices={prices} />}</div>
    </main>
  );
}
