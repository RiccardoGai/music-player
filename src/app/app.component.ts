import { Component, OnInit } from '@angular/core'
import { ISong } from './models/ISong'
import { PlaylistService } from './services/playlist/playlist.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private playlistService: PlaylistService) {}
  public playlist: ISong[] = []
  ngOnInit(): void {
    this.playlistService.getPlaylist().subscribe(
      (playlist: ISong[]) => {
        this.playlist = Array.isArray(playlist) ? playlist : []
      },
      err => {},
    )
  }
}
