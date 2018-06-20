import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { TrackBarComponent } from './track-bar.component'
import { deepEqual } from 'assert'
import { ReproductionTypes } from '../../../models/reproductionTypes'

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
    component.player = new Audio()
    component.playlist = [
      {
        title: 'Track 1',
        artist: 'Pink Floyd',
        album: 'album-1',
        year: 1970,
        src: 'assets/songs/track-01.mp3'
      },
      {
        title: 'Track 2',
        artist: 'Pink Floyd',
        album: 'album-1',
        year: 1970,
        src: 'assets/songs/track-01.mp3'
      }
    ]
    component.currentSong = component.playlist[0]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('should udpate the volume', () => {
    const volume = '0.7'
    component.updateVolume(volume)
    deepEqual(component.player.volume, volume)
  })
  it('should udpate progress', () => {
    const progress = '15'
    component.updateProgress(progress)
    deepEqual(component.player.currentTime, progress)
  })
  it('should go next song', () => {
    component.reproduction = ReproductionTypes.CLASSIC
    component.goNext()
    deepEqual(component.currentSong, component.playlist[1])
  })
  it('should go on prev song', () => {
    component.reproduction = ReproductionTypes.CLASSIC
    component.goPrev()
    deepEqual(component.currentSong, component.playlist[0])
  })
  it('should go prev and repeat the same song', () => {
    component.reproduction = ReproductionTypes.CLASSIC
    component.currentSong = component.playlist[1]
    component.player.currentTime = 10
    component.goPrev()
    deepEqual(component.currentSong, component.playlist[1])
  })
  it('should click and stop the song ', () => {
    spyOn(component, 'pause')
    fixture.whenStable().then(() => {
      deepEqual(component.player.paused, true)
    })
  })
  it('should click and play the song ', () => {
    spyOn(component, 'pause')
    fixture.whenStable().then(() => {
      deepEqual(component.player.paused, false)
    })
  })
  it('should drag and update the song progress', () => {
    const progress = '20'
    spyOn(component, 'updateProgress').and.returnValue(progress)
    fixture.whenStable().then(() => {
      deepEqual(component.player.currentTime, progress)
    })
  })
  it('should drag and update the volume', () => {
    const volume = '0.7'
    spyOn(component, 'updateVolume').and.returnValue(volume)
    fixture.whenStable().then(() => {
      deepEqual(component.player.volume, volume)
    })
  })
})
