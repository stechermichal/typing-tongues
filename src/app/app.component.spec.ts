import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'
import { HeaderComponent } from './core/header/header.component'
import { FooterComponent } from './core/footer/footer.component'

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, HeaderComponent, FooterComponent],
    })
  )

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it(`should have as title 'typing-tongues'`, () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app.title).toEqual('typing-tongues')
  })
  it('should render header and footer', () => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.querySelector('app-header')).toBeTruthy()
    expect(compiled.querySelector('app-footer')).toBeTruthy()
  })
})
