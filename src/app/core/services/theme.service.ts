import { Injectable, Renderer2, RendererFactory2 } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2
  // initialize with dark as BehaviorSubject's initial value
  private readonly _theme = new BehaviorSubject<string>('dark')
  readonly theme$ = this._theme.asObservable()

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null)
    // add the dark theme to the body by default
    this.renderer.addClass(document.body, `theme-${this.theme}`)
  }

  get theme(): string {
    return this._theme.getValue()
  }

  set theme(val: string) {
    // when settings a new theme, remove the previous one first
    const previousTheme = this.theme
    this.renderer.removeClass(document.body, `theme-${previousTheme}`)
    this.renderer.addClass(document.body, `theme-${val}`)
    this._theme.next(val)
  }
}
