import { TestBed } from '@angular/core/testing'

import { LanguageService } from './language.service'

describe('LanguageService', () => {
  let service: LanguageService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(LanguageService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should return the correct languages', () => {
    const languages = service.getLanguages()
    expect(languages).toEqual(['nativeTongue', 'foreignTongue'])
  })

  it('should return the correct data for nativeTongue', () => {
    const data = service.getLanguageData('nativeTongue')
    expect(data).toEqual([
      {
        original: 'The quick brown fox jumps over the lazy dog',
        translation: 'Der schnelle braune Fuchs springt über den faulen Hund',
      },
      {
        original: 'Pack my box with five dozen liquor jugs',
        translation: 'Packe meine Kiste mit fünf Dutzend Schnapsflaschen',
      },
    ])
  })
})
