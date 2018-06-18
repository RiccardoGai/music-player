import { Component, OnInit, Input } from '@angular/core'
import { ISong } from '../../../models/ISong'
import { CurrentSongService } from '../../../services/currentSongService/current-song.service'
import { createSnackBar } from '../../../utilities/snackBar'
enum SongConfig {
  CLASSIC = 0,
  RANDOM = 1,
  REPEAT = 2
}
@Component({
  selector: 'app-track-bar',
  templateUrl: './track-bar.component.html',
})
export class TrackBarComponent implements OnInit {
  constructor(private currentSongService: CurrentSongService) {}
  @Input() playlist: ISong[]
  public currentSong: ISong
  public progress: number = 0
  public player = new Audio() //it returns a HTMLAudioElement
  public songConfig: SongConfig = SongConfig
  public configuration = SongConfig.CLASSIC

  ngOnInit() {
    this.currentSongService.getSong().subscribe((song: ISong) => {
      this.currentSong = song
      this.player.src = this.currentSong.src
      this.play()
    })
    this.player.volume = 0.5
    this.player.addEventListener('error', (e: any) => {
      switch (e.target.error.code) {
        case e.target.error.MEDIA_ERR_ABORTED:
          createSnackBar('You aborted the video playback.', true)
          break
        case e.target.error.MEDIA_ERR_NETWORK:
          createSnackBar('A network error caused the audio download to fail.', true)
          break
        case e.target.error.MEDIA_ERR_DECODE:
          createSnackBar(
            'The audio playback was aborted due to a corruption problem or because the video used features your browser did not support.', true
          )
          break
        case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
          createSnackBar(
            'The video audio not be loaded, either because the server or network failed or because the format is not supported.', true
          )
          break
        default:
          createSnackBar('An unknown error occurred.', true)
          break
      }
    })
    this.player.addEventListener('ended', () => {
      this.goNext()
    })
    this.player.addEventListener('timeupdate', () => {
      this.progress = this.player.currentTime
    })
  }
  public play(): void {
    if (!this.currentSong) {
      this.currentSongService.setSong(this.playlist[0])
    } else {
      createSnackBar(`${this.currentSong.title}<br/>${this.currentSong.artist}`)
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
  public secondsToMinute(seconds: number) {
    seconds = seconds | 0
    return (
      Math.floor(seconds / 60) + '.' + (seconds % 60 ? (seconds % 60 < 10 ? '0' + (seconds % 60) : seconds % 60) : '00')
    )
  }
  public setRepeat(): void {
    this.configuration = this.configuration === SongConfig.REPEAT ? SongConfig.CLASSIC : SongConfig.REPEAT
  }
  public setRandom(): void {
    this.configuration = this.configuration === SongConfig.RANDOM ? SongConfig.CLASSIC : SongConfig.RANDOM
  }
}
