import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core'

import { TypingService } from 'src/app/core/services/typing.service'

@Component({
  selector: 'app-typing-area',
  templateUrl: './typing-area.component.html',
  styleUrls: ['./typing-area.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush, // This is more efficient with how often we update here, but has extra requirements
  // with @Input and child components.sIf there is an issue with updating something, this might be the culprit.
})
export class TypingAreaComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('hiddenInput') hiddenInput!: ElementRef
  @Output() focus = new EventEmitter<void>()
  @Output() blur = new EventEmitter<void>()
  @Output() typingCompleted = new EventEmitter<void>()

  private _language: 'nativeTongue' | 'foreignTongue' = 'nativeTongue'
  @Input()
  set language(val: 'nativeTongue' | 'foreignTongue') {
    this._language = val
  }
  get language(): 'nativeTongue' | 'foreignTongue' {
    return this._language
  }
  @Input() autoFocus = true

  mistakeText: string[] = []
  userTyping: string = ''
  startTime: number = 0
  textsToType = {
    nativeTongue:
      'this is crucial, as using trackBy for ngFor tells angular how to uniqeuely identify each word or char',
    foreignTongue: '',
  }
  textToType: string = this.textsToType[this.language]
  typedText: string = ''
  currentChar = this.textToType[0]
  remainingText = this.textToType.slice(1)
  isFocused = false
  @Input() pages: string[] = []

  constructor(private typingService: TypingService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if ('pages' in changes) {
      this.textsToType.nativeTongue = this.pages[20]
      this.textsToType.foreignTongue = this.pages[20]
      this.resetTyping()
    }
  }

  ngAfterViewInit(): void {
    if (this.autoFocus) {
      this.hiddenInput.nativeElement.focus()
    }
  }

  resetTyping() {
    if (!this.textsToType[this.language]) {
      return
    }

    this.userTyping = ''
    this.startTime = 0
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

    // Handle space mistypes
    if (
      this.textToType[this.userTyping.length] === ' ' &&
      this.userTyping.length < this.textToType.length
    ) {
      this.mistakeText[this.userTyping.length] =
        this.userTyping[this.userTyping.length] || ''
    }

    // Trim down the mistakeText array if needed
    if (this.mistakeText.length > this.userTyping.length) {
      this.mistakeText = this.mistakeText.slice(0, this.userTyping.length)
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

  getProcessedWords() {
    let indexOffset = 0
    return this.textToType.split(' ').map((word) => {
      const wordObject = {
        word,
        indexOffset,
      }
      indexOffset += word.length + 1 // +1 for the space
      return wordObject
    })
  }

  // this is crucial, as using trackBy for ngFor tells angular how to uniqeuely identify each word or char
  trackByFn(index: number, item: any): number {
    return item.indexOffset // unique ID corresponding to the item
  }

  getTypingClass(indexOffset: number, charIndex: number, char: string): string {
    if (
      this.mistakeText[indexOffset + charIndex] &&
      char !== this.userTyping[indexOffset + charIndex]
    ) {
      return 'text-text-error'
    }
    return 'text-text-typed'
  }
}
