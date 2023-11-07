import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, map, tap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getBookByRange(url: string, start: number, end?: number): Observable<string> {
    let range = `bytes=${start}-`
    if (end !== undefined) {
      range += end
    }

    // Create the headers object with Range
    const headers = new HttpHeaders().set('Range', range)

    return this.http.get(url, { headers: headers, responseType: 'text' })
  }

  // Modify existing methods to use getBookByRange and then paginate
  getEnglishBook(start: number, end?: number): Observable<string[]> {
    // const url = 'http://localhost:3000/api/englishBook'
    const url = 'https://typing-tongues.vercel.app/api/englishBook'
    return this.getBookByRange(url, start, end).pipe(
      map((text) => this.paginateBook(text))
    )
  }

  getGermanBook(start: number, end?: number): Observable<string[]> {
    // const url = 'http://localhost:3000/api/germanBook'
    const url = 'https://typing-tongues.vercel.app/api/germanBook'
    return this.getBookByRange(url, start, end).pipe(
      map((text) => this.paginateBook(text))
    )
  }

  private paginateBook(rawText: string): string[] {
    let cleanedText = rawText.replace(/\n/g, ' ').replace(/\r/g, ' ')
    cleanedText = cleanedText.replace(/  +/g, ' ')

    const charsPerPage = 509
    const pages = []

    let i = 0
    while (i < cleanedText.length) {
      let endIndex = i + charsPerPage
      if (endIndex >= cleanedText.length) {
        pages.push(cleanedText.slice(i))
        break
      }

      // Find the last sentence-ending punctuation before endIndex
      const sliceToCheck = cleanedText.slice(i, endIndex)
      const lastPunctuationIndex = Math.max(
        sliceToCheck.lastIndexOf('.'),
        sliceToCheck.lastIndexOf('!'),
        sliceToCheck.lastIndexOf('?')
      )

      if (lastPunctuationIndex !== -1) {
        endIndex = i + lastPunctuationIndex + 1 // +1 to include the punctuation
      } else {
        // If there's no punctuation, we can break at the last space
        const lastSpaceIndex = sliceToCheck.lastIndexOf(' ')
        if (lastSpaceIndex !== -1) {
          endIndex = i + lastSpaceIndex
        }
      }

      pages.push(cleanedText.slice(i, endIndex))
      i = endIndex
    }

    return pages
  }
}
