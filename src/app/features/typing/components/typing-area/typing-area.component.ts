import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core'
import { TypingService } from 'src/app/core/services/typing.service'
import { TypingStatus } from 'src/app/shared/enums'

@Component({
  selector: 'app-typing-area',
  templateUrl: './typing-area.component.html',
  styleUrls: ['./typing-area.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush, // This is more efficient with how often we update here, but has extra requirements
  // with @Input and child components.sIf there is an issue with updating something, this might be the culprit.
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
  typingStatusEnum = TypingStatus // Expose the enum to the template

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

    // If the current character the user has typed doesn't match the expected character...
    for (let i = 0; i < this.userTyping.length; i++) {
      // Current character the user has typed doesn't match the expected character
      if (this.userTyping[i] !== this.textToType[i]) {
        // ...then we append an 'Incorrect' status to our tracking string.
        // The 'correctTyping' string acts as a tracker of the user's typing accuracy.
        // For example, if the user types "thi" when the expected text is "the", the 'correctTyping' string will be "110",
        // indicating the user typed the first two characters correctly and the third one incorrectly.
        this.correctTyping += TypingStatus.Incorrect // Indicate an error has occurred
        // Additionally, we add the incorrect character to the 'mistakeText' string.
        // This will help in visually indicating which characters were mistyped.
        this.mistakeText += this.userTyping[i]
      } else {
        // If the character matches the expected character, we append a 'Correct' status to our tracking string.
        this.correctTyping += TypingStatus.Correct
        // To ensure the 'mistakeText' visually aligns with the original text, we add a non-breaking space for correctly typed characters.
        // This way, when overlaying the 'mistakeText' over the original text, the characters will line up correctly,
        // and only the mistakes will be visible.
        this.mistakeText += '&nbsp;'
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
