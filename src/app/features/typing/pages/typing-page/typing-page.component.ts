import { Component } from '@angular/core'
import { Language } from 'src/app/shared/enums'

@Component({
  selector: 'app-typing-page',
  templateUrl: './typing-page.component.html',
  styleUrls: ['./typing-page.component.css'],
})
export class TypingPageComponent {
  Language = Language // To use it in the template
  isEnglishFocused: boolean | null = null

  setFocus(language: Language) {
    this.isEnglishFocused = language === Language.English
  }
}
