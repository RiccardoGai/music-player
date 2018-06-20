import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { TrackBarComponent } from './components/player/track-bar/track-bar.component'
import { SongsListComponent } from './components/player/songs-list/songs-list.component'
import { PlaylistService } from './services/playlist/playlist.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { deepEqual } from 'assert'

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, SongsListComponent, TrackBarComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents()
  }))
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.debugElement.componentInstance
  })
  it('should create the app', async () => {
    expect(component).toBeTruthy()
  })
  it('should load the playlist', () => {
    component.ngOnInit()
    fixture.detectChanges()
    fixture.whenStable().then(() => {
      expect(Array.isArray(component.playlist)).toBe(true)
    })
  })
})
