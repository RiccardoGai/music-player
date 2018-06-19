import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { TrackBarComponent } from './components/player/track-bar/track-bar.component'
import { SongsListComponent } from './components/player/songs-list/songs-list.component'
import { PlayerViewComponent } from './components/player/player-view/player-view.component'

@NgModule({
  declarations: [AppComponent, TrackBarComponent, SongsListComponent, PlayerViewComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
