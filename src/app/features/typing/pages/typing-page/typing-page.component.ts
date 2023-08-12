import { Component, ViewChild } from '@angular/core'
import { Language } from 'src/app/shared/enums'
import { TypingAreaComponent } from '../../components/typing-area/typing-area.component'

@Component({
  selector: 'app-typing-page',
  templateUrl: './typing-page.component.html',
  styleUrls: ['./typing-page.component.css'],
})
export class TypingPageComponent {
  @ViewChild('foreignTongueTypingArea')
  foreignTongueTypingArea!: TypingAreaComponent

  Language = Language // To use it in the template
  isNativeTongueFocused: boolean | null = null

  setFocus(language: Language) {
    this.isNativeTongueFocused = language === Language.NativeTongue
  }

  switchFocusToForeignTongue() {
    this.isNativeTongueFocused = false

    if (this.foreignTongueTypingArea) {
      this.foreignTongueTypingArea.hiddenInput.nativeElement.focus()
    }
  }
}
