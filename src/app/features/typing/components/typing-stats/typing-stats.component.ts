import { Component, Input, OnInit, OnDestroy } from '@angular/core' // Added OnDestroy for cleanup.
import { TypingService } from 'src/app/core/services/typing.service'
import { Subscription, combineLatest } from 'rxjs' // Imported Subscription and combineLatest from RxJS.

@Component({
  selector: 'app-typing-stats',
  templateUrl: './typing-stats.component.html',
  styleUrls: ['./typing-stats.component.css'],
})
export class TypingStatsComponent implements OnInit, OnDestroy {
  @Input() language: 'nativeTongue' | 'foreignTongue' = 'nativeTongue'

  wordsPerMinute!: number
  accuracy!: number

  // Keep track of all subscriptions in this component.
  private subscriptions: Subscription = new Subscription()

  constructor(private typingService: TypingService) {}

  ngOnInit(): void {
    // Fetch the WPM observable for the selected language.
    const wpm$ = this.typingService.getWpmObservable(this.language)
    // Fetch the Accuracy observable for the selected language.
    const accuracy$ = this.typingService.getAccuracyObservable(this.language)

    // Using combineLatest to get the latest values from both observables when any one of them emits.
    const combinedSubscription = combineLatest([wpm$, accuracy$]).subscribe(
      ([wpm, acc]) => {
        this.wordsPerMinute = wpm
        this.accuracy = acc
      }
    )

    // Combined subscription to collection for easy cleanup.
    this.subscriptions.add(combinedSubscription)
  }

  ngOnDestroy(): void {
    // Unsubscribe from all observables to prevent memory leaks.
    this.subscriptions.unsubscribe()
  }
}
