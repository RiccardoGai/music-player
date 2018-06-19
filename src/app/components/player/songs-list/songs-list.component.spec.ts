import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser';
import { SongsListComponent } from './songs-list.component'
import {deepEqual} from "assert";

describe('SongsListComponent', () => {
  let component: SongsListComponent
  let fixture: ComponentFixture<SongsListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SongsListComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsListComponent)
    component = fixture.componentInstance
    component.playlist = [
      {
        title: 'Track 1',
        artist: 'Pink Floyd',
        album: 'album-1',
        year: 1970,
        src: 'assets/songs/track-01.mp3',
      },
      {
        title: 'Track 2',
        artist: 'Pink Floyd',
        album: 'album-1',
        year: 1970,
        src: 'assets/songs/track-01.mp3',
      },
    ]
    fixture.detectChanges()
  })

  it('should create ', () => {
    expect(component).toBeTruthy()
  })
  it('should display the playlist ', async () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const songsList = fixture.debugElement.queryAllNodes(By.css('.song'));
      songsList.forEach((s, index) => {
        const el: HTMLElement = s.nativeNode
        expect(el.textContent).toContain(component.playlist[index].title)
        expect(el.textContent).toContain(component.playlist[index].artist)
        expect(el.textContent).toContain(component.playlist[index].album)
        expect(el.textContent).toContain(String(component.playlist[index].year))
      })
    })
  })
  it('should change the song ',() => {
    spyOn(component, 'selectSong');
    fixture.whenStable().then(() => {
      fixture.debugElement.queryAllNodes(By.css('.song')[1].nativeElement.click())
      deepEqual(component.currentSong, component.playlist[1])
    })
  })
})
