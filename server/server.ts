import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

async function fetchBook(bookId: string) {
  const bookUrl = `https://www.gutenberg.org/files/${bookId}/${bookId}-0.txt`
  const response = await fetch(bookUrl)
  return response.text()
}

app.get('/api/englishbook', async (req, res) => {
  try {
    const bookText = await fetchBook('68283')
    res.status(200).send(bookText)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the English book.' })
  }
})

app.get('/api/germanbook', async (req, res) => {
  try {
    const bookText = await fetchBook('2229')
    res.status(200).send(bookText)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the German book.' })
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
