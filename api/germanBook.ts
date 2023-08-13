import type { VercelRequest, VercelResponse } from '@vercel/node'
import fetch from 'node-fetch'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // Handle preflight request (CORS OPTION request)
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  const bookId = '2229'
  const bookUrl = `https://www.gutenberg.org/files/${bookId}/${bookId}-0.txt`

  try {
    const response = await fetch(bookUrl)
    const bookText = await response.text()
    res.status(200).send(bookText)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the book.' })
  }
}
