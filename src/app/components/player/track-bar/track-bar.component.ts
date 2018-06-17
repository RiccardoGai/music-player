import { Component, OnInit, Input } from '@angular/core'
import { ISong } from '../../../models/ISong'
import { CurrentSongService } from '../../../services/currentSongService/current-song.service'
import {createSnackBar} from "../../../utilities/snackBar";

@Component({
  selector: 'app-track-bar',
  templateUrl: './track-bar.component.html',
})
export class TrackBarComponent implements OnInit {
  constructor(private currentSongService: CurrentSongService) {}
  @Input() playlist: ISong[]
  public currentSong: ISong
  public player = new Audio() //it returns a HTMLAudioElement

  ngOnInit() {
    this.currentSongService.getSong().subscribe((song: ISong) => {
      this.currentSong = song
      this.player.src = this.currentSong.src
      this.play();
    })
    this.player.volume = 0.5
    this.player.addEventListener('error',  (e: any) =>  {
      switch (e.target.error.code) {
        case e.target.error.MEDIA_ERR_ABORTED:
          createSnackBar('You aborted the video playback.')
          break;
        case e.target.error.MEDIA_ERR_NETWORK:
          createSnackBar('A network error caused the audio download to fail.')
          break;
        case e.target.error.MEDIA_ERR_DECODE:
          createSnackBar('The audio playback was aborted due to a corruption problem or because the video used features your browser did not support.')
          break;
        case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
          createSnackBar('The video audio not be loaded, either because the server or network failed or because the format is not supported.')
          break;
        default:
          createSnackBar('An unknown error occurred.');
          break;
      }
    })
    this.player.addEventListener('ended',() => {
ì     this.goNext()
    });
  }
  public play(): void {
    if (!this.currentSong) {
      this.currentSongService.setSong(this.playlist[0])
    } else {
        this.player.play()
    }
  }
  public pause(): void {
    this.player.pause()
  }
  public updateProgress(value: string): void {
    this.player.currentTime = parseFloat(value)
  }
  public updateVolume(value: string): void {
    this.player.volume = parseFloat(value)
  }
  public existNext(): boolean {
    if (this.playlist.indexOf(this.currentSong) === -1) {
      return false
    }
    return !!this.playlist[this.playlist.indexOf(this.currentSong) + 1]
  }
  public existPrev(): boolean {
    if (this.playlist.indexOf(this.currentSong) === -1) {
      return false
    }
    return !!this.playlist[this.playlist.indexOf(this.currentSong) - 1]
  }
  public goNext(): void {
    if (this.existNext()) {
      this.currentSongService.setSong(this.playlist[this.playlist.indexOf(this.currentSong) + 1])
    }
  }
  public goPrev(): void {
    if (this.existPrev()) {
      this.currentSongService.setSong(this.playlist[this.playlist.indexOf(this.currentSong) - 1])
    }
  }
}
