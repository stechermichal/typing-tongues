import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, map, tap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getEnglishBook(): Observable<string[]> {
    console.log('Fetching English book...') // Add this line

    const url = 'http://localhost:3000/api/englishBook'
    return this.http.get(url, { responseType: 'text' }).pipe(
      tap((text) =>
        console.log('Received book text:', text.substring(4000, 6000))
      ),
      map((text) => this.paginateBook(text))
    )
  }

  getGermanBook(): Observable<string[]> {
    console.log('Fetching German book...') // Add this line

    const url = 'http://localhost:3000/api/germanBook'
    return this.http.get(url, { responseType: 'text' }).pipe(
      tap((text) =>
        console.log('Received book text:', text.substring(4000, 6000))
      ),
      map((text) => this.paginateBook(text))
    )
  }

  private paginateBook(rawText: string): string[] {
    let cleanedText = rawText.replace(/\n/g, ' ').replace(/\r/g, ' ')
    cleanedText = cleanedText.replace(/  +/g, ' ') // Replace double spaces with single space

    console.log('Cleaned Text: ', cleanedText.substring(4000, 6000)) // Logs first 1000 characters

    const charsPerPage = 700
    const pages = []

    for (let i = 0; i < cleanedText.length; i += charsPerPage) {
      pages.push(cleanedText.slice(i, i + charsPerPage))
    }

    return pages
  }
}
