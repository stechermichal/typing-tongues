import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  getEnglishBook(): Observable<string[]> {
    return this.http
      .get(`${this.apiUrl}/englishbook`, { responseType: 'text' })
      .pipe(map((text) => this.paginateBook(text)))
  }

  getGermanBook(): Observable<string[]> {
    return this.http
      .get(`${this.apiUrl}/germanbook`, { responseType: 'text' })
      .pipe(map((text) => this.paginateBook(text)))
  }

  private paginateBook(rawText: string): string[] {
    let cleanedText = rawText.replace(/\n/g, ' ').replace(/\r/g, ' ')
    cleanedText = cleanedText.replace(/  +/g, ' ')

    const charsPerPage = 500
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
