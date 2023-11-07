import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core'
import { Language } from 'src/app/shared/enums'
import { TypingAreaComponent } from '../../components/typing-area/typing-area.component'
import { BookService } from 'src/app/core/services/book.service'

@Component({
  selector: 'app-typing-page',
  templateUrl: './typing-page.component.html',
  styleUrls: ['./typing-page.component.css'],
})
export class TypingPageComponent implements OnInit {
  @ViewChild('foreignTongueTypingArea')
  foreignTongueTypingArea!: TypingAreaComponent

  Language = Language // To use it in the template
  isNativeTongueFocused: boolean | null = null
  englishPages: string[] = []
  germanPages: string[] = []

  constructor(
    private cd: ChangeDetectorRef,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.bookService.getEnglishBook(1000).subscribe((pages) => {
      this.englishPages = pages
      // Fetch the German pages too, if you want
    })
    this.bookService.getGermanBook(1000).subscribe((pages) => {
      this.germanPages = pages
    })
  }

  setFocus(language: Language) {
    this.isNativeTongueFocused = language === Language.NativeTongue
    // avoid expression changed error
    this.cd.detectChanges()
  }

  switchFocusToForeignTongue() {
    this.isNativeTongueFocused = false

    if (this.foreignTongueTypingArea) {
      this.foreignTongueTypingArea.hiddenInput.nativeElement.focus()
    }
  }
}
