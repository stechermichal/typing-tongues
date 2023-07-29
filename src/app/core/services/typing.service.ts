import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { MS_IN_A_MINUTE } from 'src/app/shared/constants'

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
    const wpm = ((wordsTyped / elapsedTime) * MS_IN_A_MINUTE).toFixed(2)

    let correctCharacters = 0
    for (let i = 0; i < userTyping.length; i++) {
      if (userTyping[i] === textToType[i]) {
        correctCharacters++
      }
    }
    const accuracy = ((correctCharacters / textToType.length) * 100).toFixed(2)

    this.wpmSource.next(Number(wpm))
    this.accuracySource.next(Number(accuracy))
  }
}
