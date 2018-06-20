import { inject, TestBed } from '@angular/core/testing'

import { CurrentSongService } from './current-song.service'
import { ISong } from '../../models/ISong'

describe('CurrentSongService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentSongService]
    })
  })

  it('should be created', inject([CurrentSongService], (service: CurrentSongService) => {
    expect(service).toBeTruthy()
  }))
  it('should set and get the same song', inject([CurrentSongService], (service: CurrentSongService) => {
    const s = {
      title: 'Track 1',
      artist: 'Pink Floyd',
      album: 'album-1',
      year: 1970,
      src: 'assets/songs/track-01.mp3'
    }
    service.setSong(s)
    service.getSong().subscribe(song => {
      expect(song).toEqual(s)
    })
  }))
})
