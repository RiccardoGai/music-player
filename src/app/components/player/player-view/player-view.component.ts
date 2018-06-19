import { Component, OnInit } from '@angular/core'
import { ISong } from '../../../models/ISong'
import { PlaylistService } from '../../../services/playlist/playlist.service'

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html'
})
export class PlayerViewComponent implements OnInit {
  constructor(private playlistService: PlaylistService) {}
  public playlist: ISong[] = []
  ngOnInit(): void {
    this.playlistService.getPlaylist().subscribe(
      (playlist: ISong[]) => {
        this.playlist = playlist ? playlist : []
      },
      err => {}
    )
  }
}
