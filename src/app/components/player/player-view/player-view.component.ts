import { Component, OnInit } from '@angular/core'
import { PlaylistService } from '../../../services/playlist/playlist.service'
import { ISong } from '../../../models/ISong'

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
