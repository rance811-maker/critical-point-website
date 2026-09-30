import "../globals.css";
import { buildMetadata } from "../seo";

export const metadata = buildMetadata("en");

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
