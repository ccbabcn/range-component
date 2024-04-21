import '@/app/global.css';
import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <div className="intem flex h-full flex-row gap-x-6 bg-slate-800 p-6 md:flex-col md:px-6 md:py-12">
              <Link
                className="mb-2 flex h-12 w-full items-center justify-center rounded-md bg-slate-200 p-4 font-bold text-slate-800 hover:bg-slate-300 hover:text-slate-500 md:justify-start"
                href="/"
              >
                Home
              </Link>
              <Link
                className="mb-2 flex h-12 w-full items-center justify-center rounded-md bg-slate-200 p-4 font-bold text-slate-800 hover:bg-slate-300 hover:text-slate-500 md:justify-start"
                href="/exercise1"
              >
                Exercise 1
              </Link>
              <Link
                className="mb-2 flex h-12 w-full items-center justify-center rounded-md bg-slate-200 p-4 font-bold text-slate-800 hover:bg-slate-300 hover:text-slate-500 md:justify-start"
                href="/exercise2"
              >
                Exercise 2
              </Link>
            </div>
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
