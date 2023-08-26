import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { BookService } from 'src/app/core/services/book.service'
import { TypingService } from 'src/app/core/services/typing.service'
import { Language } from 'src/app/shared/enums'

@Component({
  selector: 'app-typing-area',
  templateUrl: './typing-area.component.html',
  styleUrls: ['./typing-area.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush, // This is more efficient with how often we update here, but has extra requirements
  // with @Input and child components.sIf there is an issue with updating something, this might be the culprit.
})
export class TypingAreaComponent implements OnInit, AfterViewInit {
  @ViewChild('hiddenInput') hiddenInput!: ElementRef
  @Output() focus = new EventEmitter<void>()
  @Output() blur = new EventEmitter<void>()
  @Output() typingCompleted = new EventEmitter<void>()

  private _language: 'nativeTongue' | 'foreignTongue' = 'nativeTongue'
  @Input()
  set language(val: 'nativeTongue' | 'foreignTongue') {
    this._language = val
    this.resetTyping()
  }
  get language(): 'nativeTongue' | 'foreignTongue' {
    return this._language
  }
  @Input() autoFocus = true

  mistakeText: string[] = []
  userTyping: string = ''
  startTime: number = 0
  textsToType = {
    nativeTongue: '',
    foreignTongue: 'test',
  }
  textToType: string = this.textsToType[this.language]
  typedText: string = ''
  currentChar = this.textToType[0]
  remainingText = this.textToType.slice(1)
  isFocused = false
  pages: string[] = []

  constructor(
    private typingService: TypingService,
    private bookService: BookService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.bookService.getEnglishBook().subscribe(
      (pages) => {
        this.pages = pages
        this.textsToType.nativeTongue = this.pages[5]
        this.mistakeText = Array(this.textToType.length).fill('&nbsp;')
        this.resetTyping()
        this.changeDetectorRef.detectChanges()
      },
      (error) => {
        console.error('Failed to fetch book', error)
      }
    )
  }

  ngAfterViewInit(): void {
    if (this.autoFocus) {
      this.hiddenInput.nativeElement.focus()
    }
  }

  resetTyping() {
    this.userTyping = ''
    this.startTime = 0
    // this.mistakeText =
    this.textToType = this.textsToType[this.language]
    this.typedText = ''
    this.currentChar = this.textToType[0]
    this.remainingText = this.textToType.slice(1)
  }

  onUserType() {
    for (let i = 0; i < this.userTyping.length; i++) {
      this.mistakeText[i] =
        this.userTyping[i] !== this.textToType[i]
          ? this.userTyping[i]
          : '&nbsp;'
    }

    this.typedText = this.textToType.slice(0, this.userTyping.length)
    this.currentChar = this.textToType[this.userTyping.length] || ''
    this.remainingText = this.textToType.slice(this.userTyping.length + 1)

    if (this.userTyping === this.textToType) {
      this.typingCompleted.emit()
    }

    if (!this.startTime) this.startTime = new Date().getTime()

    this.typingService.updateStats(
      this.userTyping,
      this.textToType,
      this.startTime,
      this.language
    )
  }

  @HostListener('click')
  onClick() {
    this.hiddenInput.nativeElement.focus()
  }

  onFocus() {
    this.isFocused = true
    this.focus.emit()
  }

  onBlur() {
    this.isFocused = false
    this.blur.emit()
  }
}
