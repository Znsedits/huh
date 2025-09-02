import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ziyan Solanki - Computer Science Student & Creative Technologist',
  description: 'Portfolio of Ziyan Solanki - AI Workflow Automation, Game Development, and Data Analytics specialist. Dual bachelor\'s at TCET Mumbai & IIT Patna.',
  keywords: 'Computer Science, AI Automation, Game Development, Data Analytics, IIT Patna, TCET Mumbai, ZNS Nexus',
  authors: [{ name: 'Ziyan Solanki' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}