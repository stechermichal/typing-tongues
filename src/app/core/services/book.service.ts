import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getEnglishBook(): Observable<string[]> {
    const url = 'http://localhost:3000/api/englishBook'
    return this.http
      .get(url, { responseType: 'text' })
      .pipe(map((text) => this.paginateBook(text)))
  }

  private paginateBook(rawText: string): string[] {
    const lines = rawText.split('\n')
    const linesPerPage = 20
    const pages = []

    for (let i = 0; i < lines.length; i += linesPerPage) {
      pages.push(lines.slice(i, i + linesPerPage).join('\n'))
    }

    return pages
  }
  getGermanBook() {
    const url = 'http://localhost:3000/api/germanBook'
    return this.http.get(url, { responseType: 'text' })
  }
}
