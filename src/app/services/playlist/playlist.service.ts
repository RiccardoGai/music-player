import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/index'
import { ISong } from '../../models/ISong'
@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  constructor(private http: HttpClient) {}

  public getPlaylist(): Observable<ISong[]> {
    //simulate an endpoint
    return this.http.get<ISong[]>('assets/playlist.json')
  }
}
