import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TypingAreaComponent } from './typing-area.component'

describe('TypingAreaComponent', () => {
  let component: TypingAreaComponent
  let fixture: ComponentFixture<TypingAreaComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypingAreaComponent],
    })
    fixture = TestBed.createComponent(TypingAreaComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
