import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { Button, Container, Grid, NumberInput, Pagination, Paper, Select, TextInput } from '@mantine/core'
import axios from 'axios'
import useSearchHistory from '../hooks/useSearchHistory'

export default function Search() {

  const [query, setQuery] = useState('')
  const [tags, setTags] = useState(null)
  const [numericFilter, setNumericFilter] = useState(null)
  const [operator, setOperator] = useState(null)
  const [numberValue, setNumberValue] = useState(null)
  const [page, setPage] = useState(1)
  const [maxPages, setMaxPages] = useState(null)
  const [articles, setArticles] = useState([])
  const [searchHistory, setSearchHistory] = useSearchHistory([])

  async function getNews() {
    const { data } = await axios.get('https://hn.algolia.com/api/v1/search', { params: {
      query,
      tags,
      numericFilter: numericFilter && operator && numberValue ? `${numericFilter}${operator}${numberValue}` : null,
      page
    } })
    setSearchHistory([...searchHistory, `https://hn.algolia.com/api/v1/search?query=${query}&tags=${tags}`])
    setArticles(data.hits)
    setMaxPages(data.nbPages)
  }

  return (
    <Container size="lg">
      <Head>
        <title>Search Hacker News</title>
        <meta name="description" content="Search Hacker Newrs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="title">
          <h1>
            Search Hacker News
          </h1>
          <Link href="/history">
            <a>See Search History »</a>
          </Link>
        </div>
        <Grid gutter="xl" className="search">
          <Grid.Col span={4}>
            <Grid>
              <Grid.Col span={12}>
                <TextInput
                  label="Search by Query"
                  value={query}
                  onChange={(event) => setQuery(event.currentTarget.value)}
                  placeholder="Search by phrase"
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Select
                  label="Search by Tag:"
                  placeholder="Pick a Tag"
                  value={tags}
                  onChange={ (value) => setTags(value) }
                  data={[
                    {value: 'story', label: 'story'},
                    {value: 'comment', label: 'comment'},
                    {value: 'poll', label: 'poll'},
                    {value: 'pollopt', label: 'pollopt'},
                    {value: 'show_hn', label: 'show_hn'},
                    {value: 'ask_hn', label: 'ask_hn'},
                    {value: 'front_page', label: 'front_page'},
                    {value: 'author_', label: 'author_:USERNAME'},
                    {value: 'story_', label: 'story_:ID'},
                  ]}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <label><small>Filter by Numeric Metric:</small></label>
                <Grid>
                  <Grid.Col span={6}>
                    <Select
                      // label="Filter by Numeric Metric:"
                      placeholder="Numeric Filter"
                      value={numericFilter}
                      onChange={ (value) => setNumericFilter(value) }
                      data={[
                        {value: 'created_at_i', label: 'created_at_i'},
                        {value: 'points', label: 'points'},
                        {value: 'num_comments', label: 'num_comments'}
                      ]}
                    />
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Select
                      value={operator}
                      onChange={ (value) => { setOperator(value)} }
                      data={[
                        {value: '<', label: '<'},
                        {value: '<=', label: '<='},
                        {value: '=', label: '='},
                        {value: '>', label: '>'},
                        {value: '>=', label: '>='}
                      ]}
                    />
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <NumberInput
                      value={numberValue}
                      onChange={(value) => setNumberValue(value)}
                    />
                  </Grid.Col>
                </Grid>
              </Grid.Col>
              <Grid.Col span={12}>
                <Button
                  variant="gradient"
                  gradient={{ from: 'indigo', to: 'cyan' }}
                  onClick={() => { getNews() }}
                >
                  Search Hacker News
                </Button>
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col span={8}>
            {
              maxPages &&
              <Pagination
                className="topPagination"
                page={page}
                onChange={(value) => {
                  setPage(value)
                  getNews()
                }}
                total={maxPages}
              />
            }
            {
              articles.map(article => (
                <Paper className="article" shadow="sm" p="xs">
                  <a href={article.url}>{ article.title || article.story_title }</a>
                </Paper>
              ))
            }
            {
              maxPages &&
              <Pagination
                className="bottomPagination"
                page={page}
                onChange={(value) => {
                  setPage(value)
                  getNews()
                }}
                total={maxPages}
              />
            }
          </Grid.Col>
        </Grid>
      </main>

      <footer>
      </footer>
    </Container>
  )
}
