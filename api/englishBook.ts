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
  const bookId = '68283'
  const bookUrl = `https://www.gutenberg.org/files/${bookId}/${bookId}-0.txt`
  const rangeHeader = req.headers['range'] as string | undefined
  const headers = rangeHeader ? { Range: rangeHeader } : undefined

  try {
    const response = await fetch(bookUrl, { headers })

    // Check if the partial content has been returned
    if (response.status === 206) {
      const bookText = await response.text()
      res.setHeader(
        'Content-Range',
        response.headers.get('Content-Range') || ''
      )
      res.setHeader(
        'Accept-Ranges',
        response.headers.get('Accept-Ranges') || ''
      )
      res.status(206).send(bookText)
    } else {
      // If Range is not supported or the full content is returned
      const bookText = await response.text()
      res.status(200).send(bookText)
    }
  } catch (error) {
    console.error('Failed to fetch the book:', error)
    res.status(500).json({ error: 'Failed to fetch the book.' })
  }
}
