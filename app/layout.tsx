import './globals.css'
import type { Metadata } from 'next'
import { Philosopher} from 'next/font/google'

const philosopher = Philosopher({weight:"400",subsets:['latin']});


export const metadata: Metadata = {
  title: 'Art by deadlyunicorn.',
  description: 'Welcome to my art page. Feel free to browse my artworks here.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg"/>
      </head>
      <body className={philosopher.className}>{children}</body>
    </html>
  )
}
