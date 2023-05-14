import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LanguagePageComponent } from './language-page.component'

describe('LanguagePageComponent', () => {
  let component: LanguagePageComponent
  let fixture: ComponentFixture<LanguagePageComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanguagePageComponent],
    })
    fixture = TestBed.createComponent(LanguagePageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
