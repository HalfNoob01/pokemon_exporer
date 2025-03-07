import { Provider } from "@/components/ui/provider"
import "./globals.css"
import StoreProvider from "./StoreProvider"

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html suppressHydrationWarning>
      <body>   
        <Provider><StoreProvider>{children}</StoreProvider></Provider>
      </body>
    </html>
  )
}