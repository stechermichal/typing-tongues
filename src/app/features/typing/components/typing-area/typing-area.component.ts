import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
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
  @ViewChild('hiddenInput') hiddenInput!: ElementRef
  mistakeText = '' // Newly added variable
  userTyping: string = ''
  startTime: number = 0
  textToType: string = 'the quick brown fox jumps over the lazy dog.'
  typedText = ''
  currentChar = this.textToType[0]
  remainingText = this.textToType.slice(1)
  theme$: Observable<string>
  errorText = ''
  correctTyping: string = ''

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

  ngAfterViewInit(): void {
    this.hiddenInput.nativeElement.focus()
  }

  resetTyping() {
    this.userTyping = ''
    this.startTime = 0
    this.typedText = ''
    this.mistakeText = ''
    this.currentChar = this.textToType[0]
    this.remainingText = this.textToType.slice(1)
    this.errorText = ''
    this.correctTyping = ''
  }

  @HostListener('input', ['$event'])
  onUserType(event: Event) {
    const inputElement = event.target as HTMLInputElement
    const latestInput = inputElement.value

    if (latestInput.length > this.typedText.length) {
      if (
        latestInput.charAt(latestInput.length - 1) !==
        this.textToType.charAt(latestInput.length - 1)
      ) {
        this.mistakeText += latestInput.charAt(latestInput.length - 1)
        this.correctTyping += '0' // indicate an error has occurred
      } else {
        this.mistakeText += '&nbsp;'
        this.correctTyping += '1' // indicate the character was typed correctly
      }
      this.typedText += this.textToType.charAt(latestInput.length - 1)
    } else if (latestInput.length < this.typedText.length) {
      this.mistakeText = this.mistakeText.slice(0, -1)
      this.typedText = this.typedText.slice(0, -1)
      this.correctTyping = this.correctTyping.slice(0, -1)
    }
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
