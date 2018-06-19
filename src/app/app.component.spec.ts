import {async, TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { TrackBarComponent } from './components/player/track-bar/track-bar.component'
import { SongsListComponent } from './components/player/songs-list/songs-list.component'
import {PlaylistService} from "./services/playlist/playlist.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";


describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, SongsListComponent, TrackBarComponent],
      imports : [HttpClientTestingModule]
    }).compileComponents()
  }))
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  }))
  it('should load the playlist', () => {
    const playlistService = TestBed.get(PlaylistService)
    playlistService.getPlaylist().subscribe(data => {
      expect(data).toBe(Array);
      expect(data).not.toBeLessThan(0)
    })
  })
})
