import React from 'react';
import type { Metadata } from 'next'
import '@fortawesome/fontawesome-svg-core/styles.css';


export const metadata: Metadata = {
  title: 'Vibes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
