import { GoogleTagManager } from '@next/third-parties/google';
import '@/styles/globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="G-P0KR5923QL" />
      <body>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

