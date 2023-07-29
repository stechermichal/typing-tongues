import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class TypingService {
  private wpmSource = new BehaviorSubject<number>(0)
  private accuracySource = new BehaviorSubject<number>(0)

  currentWpm: Observable<number> = this.wpmSource.asObservable()
  currentAccuracy: Observable<number> = this.accuracySource.asObservable()

  constructor() {}

  updateStats(userTyping: string, textToType: string, startTime: number) {
    const elapsedTime = new Date().getTime() - startTime
    const wordsTyped = userTyping.split(' ').length
    const wpm = (wordsTyped / elapsedTime) * 60000

    let correctCharacters = 0
    for (let i = 0; i < userTyping.length; i++) {
      if (userTyping[i] === textToType[i]) {
        correctCharacters++
      }
    }
    const accuracy = (correctCharacters / textToType.length) * 100

    this.wpmSource.next(wpm)
    this.accuracySource.next(accuracy)
  }
}
