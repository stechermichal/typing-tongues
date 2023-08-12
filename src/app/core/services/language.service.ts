import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languages: {
    [key: string]: { original: string; translation: string }[]
  } = {
    nativeTongue: [
      {
        original: 'The quick brown fox jumps over the lazy dog',
        translation: 'Der schnelle braune Fuchs springt über den faulen Hund',
      },
      {
        original: 'Pack my box with five dozen liquor jugs',
        translation: 'Packe meine Kiste mit fünf Dutzend Schnapsflaschen',
      },
    ],
    foreignTongue: [
      {
        original: 'Franz jagt im komplett verwahrlosten Taxi quer durch Bayern',
        translation:
          'Franz chases through Bavaria in a completely dilapidated taxi',
      },
      {
        original:
          'Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich',
        translation: 'Twelve boxers chase Viktor across the big dam on Sylt',
      },
    ],
  }

  constructor() {}

  getLanguages(): string[] {
    return Object.keys(this.languages)
  }

  getLanguageData(
    language: string
  ): { original: string; translation: string }[] {
    return this.languages[language]
  }
}
