import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { PlayerViewComponent } from './components/player/player-view/player-view.component'
import { SongsListComponent } from './components/player/songs-list/songs-list.component'
import { TrackBarComponent } from './components/player/track-bar/track-bar.component'

@NgModule({
  declarations: [AppComponent, TrackBarComponent, SongsListComponent, PlayerViewComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
