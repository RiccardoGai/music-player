import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { SongsListComponent } from './components/player/songs-list/songs-list.component'
import { TrackBarComponent } from './components/player/track-bar/track-bar.component'

@NgModule({
  declarations: [AppComponent, TrackBarComponent, SongsListComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
