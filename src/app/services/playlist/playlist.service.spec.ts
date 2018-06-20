import { inject, TestBed } from '@angular/core/testing'

import { PlaylistService } from './playlist.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('PlaylistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaylistService],
      imports: [HttpClientTestingModule]
    })
  })

  it('should be created', inject([PlaylistService], (service: PlaylistService) => {
    expect(service).toBeTruthy()
  }))
  it('should load the json', inject([PlaylistService], (service: PlaylistService) => {
    const json = require('../../../assets/playlist.json')
    service.getPlaylist().subscribe(data => {
      expect(data).toEqual(json)
    })
  }))
})
