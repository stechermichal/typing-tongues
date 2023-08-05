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

  // Add a new property to keep track of total keypresses
  private totalKeyPresses = 0
  private mistakesMade = 0
  private maxTypedLength = 0

  updateStats(userTyping: string, textToType: string, startTime: number) {
    const elapsedTime = new Date().getTime() - startTime
    const wordsTyped = userTyping.split(' ').length
    const wpm = ((wordsTyped / elapsedTime) * MS_IN_A_MINUTE).toFixed(2)

    let correctCharacters = 0

    for (let i = 0; i < userTyping.length; i++) {
      if (userTyping[i] === textToType[i]) {
        correctCharacters++
      } else if (i === this.totalKeyPresses) {
        // We only count mistakes on new keypresses to avoid overcounting
        this.mistakesMade++
      }
    }

    // Increase the total keypresses after checking for mistakes
    this.totalKeyPresses = userTyping.length

    // The accuracy now considers mistakes made against total keypresses
    const accuracy = (
      (100 * (this.totalKeyPresses - this.mistakesMade)) /
      this.totalKeyPresses
    ).toFixed(2)

    this.wpmSource.next(Number(wpm))
    this.accuracySource.next(Number(accuracy))
  }
}
