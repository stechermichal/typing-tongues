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

  updateStats(wpm: number, accuracy: number) {
    this.wpmSource.next(wpm)
    this.accuracySource.next(accuracy)
  }
}
