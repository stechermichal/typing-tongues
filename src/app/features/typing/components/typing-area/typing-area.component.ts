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
    this.mistakeText = ''
    this.currentChar = this.textToType[0]
    this.remainingText = this.textToType.slice(1)
    this.errorText = ''
    this.correctTyping = ''
  }

  @HostListener('input', ['$event'])
  onUserType(event: Event) {
    const inputElement = event.target as HTMLInputElement
    this.userTyping = inputElement.value

    this.correctTyping = ''
    this.mistakeText = ''

    for (let i = 0; i < this.userTyping.length; i++) {
      if (this.userTyping[i] !== this.textToType[i]) {
        this.correctTyping += '0' // Indicate an error has occurred
        this.mistakeText += this.userTyping[i]
      } else {
        this.correctTyping += '1' // Indicate the character was typed correctly
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
