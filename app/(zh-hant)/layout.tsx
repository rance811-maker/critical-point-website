import "../globals.css";
import { buildMetadata } from "../seo";

export const metadata = buildMetadata("zh-Hant");

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
