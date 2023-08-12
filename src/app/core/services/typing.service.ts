import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { MS_IN_A_MINUTE } from 'src/app/shared/constants'

interface TypingStats {
  wpm: BehaviorSubject<number>
  accuracy: BehaviorSubject<number>
  totalKeyPresses: number
  mistakesMade: number
  previousTypedLength: number // Keep track of previously typed length
}

@Injectable({
  providedIn: 'root',
})
export class TypingService {
  // Initial stats for both nativeTongue and foreignTongue languages.
  private stats: Record<string, TypingStats> = {
    nativeTongue: {
      wpm: new BehaviorSubject<number>(0),
      accuracy: new BehaviorSubject<number>(0),
      totalKeyPresses: 0,
      mistakesMade: 0,
      previousTypedLength: 0,
    },
    foreignTongue: {
      wpm: new BehaviorSubject<number>(0),
      accuracy: new BehaviorSubject<number>(0),
      totalKeyPresses: 0,
      mistakesMade: 0,
      previousTypedLength: 0,
    },
  }

  constructor() {}

  // Get Observable for WPM for a given language.
  getWpmObservable(language: string): Observable<number> {
    return this.stats[language].wpm.asObservable()
  }

  // Get Observable for accuracy for a given language.
  getAccuracyObservable(language: string): Observable<number> {
    return this.stats[language].accuracy.asObservable()
  }

  // Update the typing statistics based on user input, expected text, start time, and language.
  updateStats(
    userTyping: string,
    textToType: string,
    startTime: number,
    language: string
  ) {
    const stats = this.stats[language]

    // If the length of user input has decreased, they've used backspace.
    if (userTyping.length < stats.previousTypedLength) {
      // Calculate number of characters removed.
      const charsRemoved = stats.previousTypedLength - userTyping.length

      // Subtract those characters from the total key presses.
      stats.totalKeyPresses -= charsRemoved
    } else {
      // Compare the user's new input against the original text.
      for (let i = stats.previousTypedLength; i < userTyping.length; i++) {
        // Increment total keypress count.
        stats.totalKeyPresses++

        // Check for mistakes.
        if (i >= textToType.length || userTyping[i] !== textToType[i]) {
          stats.mistakesMade++
        }
      }
    }

    // Update previousTypedLength
    stats.previousTypedLength = userTyping.length

    // Calculate the time elapsed since the user started typing, in minutes.
    const elapsedTimeInMinutes =
      (new Date().getTime() - startTime) / MS_IN_A_MINUTE

    // Calculate WPM.
    const wpm = userTyping.split(' ').length / elapsedTimeInMinutes

    // Calculate accuracy considering mistakes made against total keypresses.
    const accuracy =
      (100 * (stats.totalKeyPresses - stats.mistakesMade)) /
      stats.totalKeyPresses

    // Update the BehaviorSubjects for WPM and accuracy with the newly calculated values.
    stats.wpm.next(Number(wpm.toFixed(2)))
    stats.accuracy.next(Number(accuracy.toFixed(2)))
  }
}
