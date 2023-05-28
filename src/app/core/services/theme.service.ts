import { Injectable, Renderer2, RendererFactory2 } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2
  private readonly _theme = new BehaviorSubject<string>('light')
  readonly theme$ = this._theme.asObservable()

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null)
  }

  get theme(): string {
    return this._theme.getValue()
  }

  set theme(val: string) {
    const previousTheme = this.theme
    this.renderer.removeClass(document.body, `theme-${previousTheme}`)
    this.renderer.addClass(document.body, `theme-${val}`)
    this._theme.next(val)
  }
}
