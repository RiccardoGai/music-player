import { TestBed, inject } from '@angular/core/testing'

import { CurrentSongService } from './current-song.service'

describe('CurrentSongService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentSongService]
    })
  })

  it('should be created', inject([CurrentSongService], (service: CurrentSongService) => {
    expect(service).toBeTruthy()
  }))
})
