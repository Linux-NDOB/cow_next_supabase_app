import { Manrope } from 'next/font/google'
import { ThemeProvider } from "next-themes";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Vex",
  description: "Cow real time monitor",
};

const MANROPE = Manrope({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={MANROPE.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main className='min-h-screen w-full flex flex-col items-center'>{children}</main>
          {/* <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-2 items-center">
              {children}
               <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16"></footer> 
            </div>
          </main> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
