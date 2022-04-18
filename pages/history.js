import Head from 'next/head'
import Link from 'next/link'
import { Container } from '@mantine/core'
import useSearchHistory from '../hooks/useSearchHistory'

export default function History() {
  const [searchHistory, setSearchHistory] = useSearchHistory([])

  return (
    <Container>
      <Head>
        <title>Hacker News Session Search History</title>
        <meta name="description" content="Search Hacker Newrs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div class="title">
          <h1>
          Hacker News Session Search History
          </h1>
          <Link href="/search">
            <a>« Go back to Search</a>
          </Link>
        </div>
        {
          searchHistory.map(search => (
            <p>{ search }</p>
          ))
        }
      </main>

      <footer>
      </footer>
    </Container>
  )
}
