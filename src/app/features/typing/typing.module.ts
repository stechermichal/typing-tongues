import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TypingAreaComponent } from './components/typing-area/typing-area.component'
import { TypingStatsComponent } from './components/typing-stats/typing-stats.component'
import { TypingPageComponent } from './pages/typing-page/typing-page.component'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    TypingAreaComponent,
    TypingStatsComponent,
    TypingPageComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [TypingAreaComponent],
})
export class TypingModule {}
