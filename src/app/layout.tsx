import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { ColumnsProvider } from "@/context/ColumnsContext";
import { StorageProvider } from "@/provider/StorageProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Kanban Board",
  description: "Simple Kanban board for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ColumnsProvider>
          <StorageProvider>
            <main>{children}</main>
          </StorageProvider>
        </ColumnsProvider>
      </body>
    </html>
  );
}
