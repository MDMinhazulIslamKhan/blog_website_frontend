import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/lib/Providers";
import Header from "@/componets/layout/header";
import Footer from "@/componets/layout/footer";

export const metadata: Metadata = {
  title: "My Blog",
  description: "Blog app, Md. Minhazul Islam Khan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <Header />
          <div className="min-h-[90vh]">{children}</div>
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
