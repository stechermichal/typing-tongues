import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TypingStatsComponent } from './typing-stats.component'

describe('TypingStatsComponent', () => {
  let component: TypingStatsComponent
  let fixture: ComponentFixture<TypingStatsComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypingStatsComponent],
    })
    fixture = TestBed.createComponent(TypingStatsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
