import { Component, OnInit } from '@angular/core'
import { TypingService } from 'src/app/core/services/typing.service'

@Component({
  selector: 'app-typing-stats',
  templateUrl: './typing-stats.component.html',
  styleUrls: ['./typing-stats.component.css'],
})
export class TypingStatsComponent implements OnInit {
  wordsPerMinute!: number
  accuracy!: number

  constructor(private typingService: TypingService) {}

  ngOnInit(): void {
    this.typingService.currentWpm.subscribe(
      (wpm) => (this.wordsPerMinute = wpm)
    )
    this.typingService.currentAccuracy.subscribe((acc) => (this.accuracy = acc))
  }
}
