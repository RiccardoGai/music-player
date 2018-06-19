import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { TrackBarComponent } from './track-bar.component'

describe('TrackBarComponent', () => {
  let component: TrackBarComponent
  let fixture: ComponentFixture<TrackBarComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrackBarComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackBarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
