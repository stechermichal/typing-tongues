import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { ThemeService } from '../services/theme.service'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  theme$: Observable<string>

  constructor(private themeService: ThemeService) {
    this.theme$ = this.themeService.theme$
  }
}
