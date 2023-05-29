import { Component } from '@angular/core'
import { ThemeService } from '../services/theme.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private themeService: ThemeService) {}

  // Called when user selects a new theme from the dropdown
  switchTheme(theme: string) {
    // Pass the new theme value to the ThemeService
    this.themeService.theme = theme
  }
}
