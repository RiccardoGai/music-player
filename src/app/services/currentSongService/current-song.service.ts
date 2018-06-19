import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs/'
import { ISong } from '../../models/ISong'
@Injectable({
  providedIn: 'root'
})
export class CurrentSongService {
  private currentSong: Subject<ISong> = new Subject<ISong>()
  private isPause: Subject<void> = new Subject<void>()
  constructor() {}
  setSong(song: ISong): void {
    this.currentSong.next(song)
  }
  getSong(): Observable<ISong> {
    return this.currentSong.asObservable()
  }
}
