import { Component, Input, OnInit } from '@angular/core'
import { ISong } from '../../../models/ISong'
import { ReproductionTypes } from '../../../models/reproductionTypes'
import { CurrentSongService } from '../../../services/currentSongService/current-song.service'
import { createSnackBar } from '../../../utilities/snackBar'
@Component({
  selector: 'app-track-bar',
  templateUrl: './track-bar.component.html'
})
export class TrackBarComponent implements OnInit {
  constructor(private currentSongService: CurrentSongService) {}
  @Input() playlist: ISong[]
  public currentSong: ISong
  public progress = 0
  public player = new Audio() // it returns a HTMLAudioElement
  public reproductionTypes: typeof ReproductionTypes = ReproductionTypes
  public reproduction: number = ReproductionTypes.CLASSIC

  ngOnInit(): void {
    this.currentSongService.getSong().subscribe((song: ISong) => {
      if (song) {
        this.currentSong = song
        this.player.src = this.currentSong.src
        this.play()
      }
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
            'The audio playback was aborted due to a corruption problem or because the video used features your browser did not support.',
            true
          )
          break
        case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
          createSnackBar(
            'The video audio not be loaded, either because the server or network failed or because the format is not supported.',
            true
          )
          break
        default:
          createSnackBar('An unknown error occurred.', true)
          break
      }
    })
    this.player.addEventListener('ended', () => {
      if (this.reproduction === ReproductionTypes.REPEAT) {
        this.currentSongService.setSong(this.currentSong)
        return
      }
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
  public goNext(): void {
    if (this.reproduction === ReproductionTypes.RANDOM) {
      this.currentSongService.setSong(this.playlist[Math.floor(Math.random() * this.playlist.length)])
      return
    }
    const index = !!this.playlist[this.playlist.indexOf(this.currentSong) + 1]
      ? this.playlist.indexOf(this.currentSong) + 1
      : 0
    this.currentSongService.setSong(this.playlist[index])
  }
  public goPrev(): void {
    if (this.player.currentTime > 5) {
      this.player.load()
      this.play()
      return
    }
    const index = !!this.playlist[this.playlist.indexOf(this.currentSong) - 1]
      ? this.playlist.indexOf(this.currentSong) - 1
      : 0
    this.currentSongService.setSong(this.playlist[index])
  }
  public secondsToMinute(seconds: number): string {
    seconds = Math.floor(seconds)
    return (
      Math.floor(seconds / 60) + '.' + (seconds % 60 ? (seconds % 60 < 10 ? '0' + (seconds % 60) : seconds % 60) : '00')
    )
  }
  public setRepeat(): void {
    this.reproduction =
      this.reproduction === ReproductionTypes.REPEAT ? ReproductionTypes.CLASSIC : ReproductionTypes.REPEAT
  }
  public setRandom(): void {
    this.reproduction =
      this.reproduction === ReproductionTypes.RANDOM ? ReproductionTypes.CLASSIC : ReproductionTypes.RANDOM
  }
}
