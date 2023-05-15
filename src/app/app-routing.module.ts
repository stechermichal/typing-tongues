import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TypingPageComponent } from './features/typing/pages/typing-page/typing-page.component'

const routes: Routes = [
  { path: 'typing', component: TypingPageComponent },
  // other routes...
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
