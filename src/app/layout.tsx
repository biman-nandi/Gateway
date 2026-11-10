import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "GateWay",
  description: "This is a full-stack next.js authentication page",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
    >
      <body>
        {children}

        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
