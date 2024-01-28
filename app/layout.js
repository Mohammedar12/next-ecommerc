import { GlobalProvider } from "./GlobalProviders";
import "./globals.css";
import Navbar from "@/components/Navbar/navbar";
import Footer from "@/section/Footer/Footer";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>
          <div className="min-h-screen w-full flex flex-col relative">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </GlobalProvider>
      </body>
    </html>
  );
}
