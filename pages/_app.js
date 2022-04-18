import '../styles/globals.css'
import { SearchHistoryProvider } from '../hooks/useSearchHistory'

function MyApp({ Component, pageProps }) {
  return (
    <SearchHistoryProvider>
      <Component {...pageProps} />
    </SearchHistoryProvider>
  )
}

export default MyApp
