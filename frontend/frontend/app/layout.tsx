import "./globals.css";

export const metadata = {
  title: 'Weather App',
  description: 'Check your city weather forecast',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
