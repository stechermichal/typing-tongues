import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  OnInit,
} from '@angular/core'
import { TypingService } from 'src/app/core/services/typing.service'

@Component({
  selector: 'app-typing-area',
  templateUrl: './typing-area.component.html',
  styleUrls: ['./typing-area.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush, // This is more efficient with how often we update here, but has extra requirements
  // with @Input and child components. If there is an issue with updating something, this might be the culprit.
})
export class TypingAreaComponent implements OnInit {
  @ViewChild('hiddenInput') hiddenInput!: ElementRef
  mistakeText = ''
  userTyping: string = ''
  startTime: number = 0
  textToType: string = 'the quick brown fox jumps over the lazy dog.'
  typedText = ''
  currentChar = this.textToType[0]
  remainingText = this.textToType.slice(1)
  correctTyping: string = ''

  constructor(
    private typingService: TypingService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.resetTyping()
  }

  ngAfterViewInit(): void {
    this.hiddenInput.nativeElement.focus()
  }

  resetTyping() {
    this.userTyping = ''
    this.startTime = 0
    this.mistakeText = ''
    this.currentChar = this.textToType[0]
    this.remainingText = this.textToType.slice(1)
    this.correctTyping = ''
  }

  // Event handler for user typing. This is triggered every time the user types something.
  @HostListener('input', ['$event'])
  onUserType(event: Event) {
    const inputElement = event.target as HTMLInputElement // Extract the target element of the event
    this.userTyping = inputElement.value // Update userTyping with the current value of the input element

    this.correctTyping = ''
    this.mistakeText = ''

    // Check each character typed by the user and update the tracking variables accordingly
    for (let i = 0; i < this.userTyping.length; i++) {
      if (this.userTyping[i] !== this.textToType[i]) {
        this.correctTyping += '0' // Indicate an error has occurred
        this.mistakeText += this.userTyping[i]
      } else {
        this.correctTyping += '1' // Indicate the character was typed correctly
        this.mistakeText += '&nbsp;' // This is so that the mistake text is the same length as the text to type and thus it lines up
      }
    }

    this.typedText = this.textToType.slice(0, this.userTyping.length)

    if (!this.startTime) {
      this.startTime = new Date().getTime()
    }

    this.currentChar = this.textToType[this.typedText.length]
    this.remainingText = this.textToType.slice(this.typedText.length + 1)

    this.typingService.updateStats(
      this.userTyping,
      this.textToType,
      this.startTime
    )

    this.cd.detectChanges()
  }

  @HostListener('click')
  onClick() {
    this.hiddenInput.nativeElement.focus()
  }
}
