import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core'
import { Observable } from 'rxjs'
import { TypingService } from 'src/app/core/services/typing.service'
import { ThemeService } from '../../../../core/services/theme.service'

@Component({
  selector: 'app-typing-area',
  templateUrl: './typing-area.component.html',
  styleUrls: ['./typing-area.component.css'],
})
export class TypingAreaComponent implements OnInit {
  userTyping: string = ''
  startTime: number = 0
  wordsPerMinute: number = 0
  accuracy: number = 0
  textToType: string = 'The quick brown fox jumps over the lazy dog.'
  typedText = ''
  currentChar = this.textToType[0]
  remainingText = this.textToType.slice(1)
  theme$: Observable<string>

  constructor(
    private typingService: TypingService,
    private themeService: ThemeService,
    private cd: ChangeDetectorRef
  ) {
    this.theme$ = this.themeService.theme$
  }

  ngOnInit(): void {
    this.resetTyping()
  }

  resetTyping() {
    this.userTyping = ''
    this.startTime = 0
    this.wordsPerMinute = 0
    this.accuracy = 0
    this.typedText = ''
    this.currentChar = this.textToType[0]
    this.remainingText = this.textToType.slice(1)
  }

  @HostListener('window:keydown', ['$event'])
  onUserType(event: KeyboardEvent) {
    if (!this.startTime) {
      this.startTime = new Date().getTime()
    }

    // If the key is a single character, add it to the input
    if (event.key.length === 1 && !event.ctrlKey) {
      this.userTyping += event.key
    }

    // If the key is Backspace, remove the last character or word from the input
    if (event.key === 'Backspace') {
      if (event.ctrlKey) {
        // If Ctrl is also pressed, remove the last word
        const lastSpaceIndex = this.userTyping.lastIndexOf(' ')
        if (lastSpaceIndex === -1) {
          // If there's no space, clear the entire input
          this.userTyping = ''
        } else {
          // If there's a space, remove the last word
          this.userTyping = this.userTyping.substring(0, lastSpaceIndex)
        }
      } else {
        // If only Backspace is pressed, remove the last character
        this.userTyping = this.userTyping.slice(0, -1)
      }
    }

    this.typedText = this.userTyping
    this.currentChar = this.textToType[this.typedText.length]
    this.remainingText = this.textToType.slice(this.typedText.length + 1)

    this.calculateStats()

    this.cd.detectChanges()
  }

  calculateStats() {
    const elapsedTime = new Date().getTime() - this.startTime // in milliseconds
    const wordsTyped = this.userTyping.split(' ').length
    this.wordsPerMinute = (wordsTyped / elapsedTime) * 60000 // 60000 ms in a minute

    let correctCharacters = 0
    for (let i = 0; i < this.userTyping.length; i++) {
      if (this.userTyping[i] === this.textToType[i]) {
        correctCharacters++
      }
    }
    this.accuracy = (correctCharacters / this.textToType.length) * 100 // as a percentage

    this.typingService.updateStats(this.wordsPerMinute, this.accuracy)
  }
}
