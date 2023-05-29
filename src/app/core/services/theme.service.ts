import { Injectable, Renderer2, RendererFactory2 } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // Renderer for manipulating classes on the DOM elements
  private renderer: Renderer2

  // Initialize the theme from local storage or use 'dark' as default
  private readonly _theme = new BehaviorSubject<string>(
    localStorage.getItem('theme') || 'dark'
  )

  // Observable to emit changes in theme for components to subscribe to
  readonly theme$ = this._theme.asObservable()

  constructor(rendererFactory: RendererFactory2) {
    // Create an instance of Renderer
    this.renderer = rendererFactory.createRenderer(null, null)

    // Add the theme to the body element when the service is created
    this.renderer.addClass(document.body, `theme-${this.theme}`)
  }

  get theme(): string {
    // return the current value of _theme
    return this._theme.getValue()
  }

  set theme(val: string) {
    // Get the previous theme before changing to new one
    const previousTheme = this.theme

    // Remove the class of the previous theme from body
    this.renderer.removeClass(document.body, `theme-${previousTheme}`)

    // Add the class of the new theme to body
    this.renderer.addClass(document.body, `theme-${val}`)

    // Store the new theme in local storage
    localStorage.setItem('theme', val)

    // Emit the new theme value through the BehaviorSubject
    this._theme.next(val)
  }
}
