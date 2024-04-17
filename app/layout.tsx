import '@/app/styles/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="d-flex h-screen flex-col items-center justify-center">
          {children}
        </div>
      </body>
    </html>
  );
}
