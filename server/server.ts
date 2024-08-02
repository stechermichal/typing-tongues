import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : '*',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

async function fetchBook(bookId: string) {
  const bookUrl = `https://www.gutenberg.org/files/${bookId}/${bookId}-0.txt`
  const response = await fetch(bookUrl)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.text()
}

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' })
})

app.get('/api/englishbook', async (req, res) => {
  try {
    const bookText = await fetchBook('68283')
    res.status(200).send(bookText)
  } catch (error) {
    console.error('Error fetching English book:', error)
    res.status(500).json({ error: 'Failed to fetch the English book.' })
  }
})

app.get('/api/germanbook', async (req, res) => {
  try {
    const bookText = await fetchBook('2229')
    res.status(200).send(bookText)
  } catch (error) {
    console.error('Error fetching German book:', error)
    res.status(500).json({ error: 'Failed to fetch the German book.' })
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
