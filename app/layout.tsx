import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "盆栽タイクーン - 育てて売って稼ぐ放置ゲーム",
  description: "盆栽を育てて売ってコインを稼ごう。放置しても成長する！日本の美しい盆栽を育てる癒し系タイクーンゲーム",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌲</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="sand-pattern">
        {children}
      </body>
    </html>
  );
}
