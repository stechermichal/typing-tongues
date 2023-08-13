import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getEnglishBook() {
    const url = 'http://localhost:3000/api/englishBook'
    return this.http.get(url, { responseType: 'text' })
  }

  getGermanBook() {
    const url = 'http://localhost:3000/api/germanBook'
    return this.http.get(url, { responseType: 'text' })
  }
}
