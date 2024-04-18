import { Metadata } from 'next';
import Range from '@/components/range/range';

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
export default function Page() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-y-4">
      <h1 className="text-xl font-bold text-blue-500">Range component</h1>
      <div className="w-1/2">
        <Range />
      </div>
    </div>
  );
}
