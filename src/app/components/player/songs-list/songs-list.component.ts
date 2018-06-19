import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { ISong } from '../../../models/ISong'
import { CurrentSongService } from '../../../services/currentSongService/current-song.service'

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
})
export class SongsListComponent implements OnInit {
  @Input() playlist: ISong[]
  public currentSong: ISong
  constructor(private currentSongService: CurrentSongService) {
    this.currentSongService.getSong().subscribe((song: ISong) => {
      this.currentSong = song
    })
  }

  ngOnInit(): void {}
  public selectSong(song: ISong): void {
    this.currentSongService.setSong(song)
  }
}
