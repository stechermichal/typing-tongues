import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LanguageSelectionComponent } from './components/language-selection/language-selection.component'
import { LanguagePageComponent } from './pages/language-page/language-page.component'

@NgModule({
  declarations: [LanguageSelectionComponent, LanguagePageComponent],
  imports: [CommonModule],
})
export class LanguagesModule {}
