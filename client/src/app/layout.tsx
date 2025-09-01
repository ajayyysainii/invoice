// app/layout.tsx
import './globals.css'; // Global styles

export const metadata = {
  title: 'My Next.js App',
  description: 'A description of my Next.js application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}