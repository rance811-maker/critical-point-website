import "../globals.css";
import { buildMetadata } from "../seo";

export const metadata = buildMetadata("zh-Hans");

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hans">
      <body>{children}</body>
    </html>
  );
}
