import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SongDataService } from './services/song-data.service';
import { FavoriteSongsService } from './services/favorite-songs.service';
import { SongListComponent } from './components/song-list/song-list.component';
import { SongDataComponent } from './components/song-data/song-data.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';   
import { SongFilterPipe } from './pipes/song-filter.pipe';
import { HighlightMatchPipe } from './pipes/highlight-match.pipe';
import { FavoriteSongsListComponent } from './components/favorite-songs-list/favorite-songs-list.component';
import { FavoriteSongItemComponent } from './components/favorite-song-item/favorite-song-item.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { AppSpinnerComponent } from './components/app-spinner/app-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    SongListComponent,
    SongDataComponent,
    SongFilterPipe,
    HighlightMatchPipe,
    FavoriteSongsListComponent,
    FavoriteSongItemComponent,
    PageHeaderComponent,
    AppSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpClientModule,
    AngularFontAwesomeModule,
  ],
  providers: [SongDataService, FavoriteSongsService],   
  bootstrap: [AppComponent]
})
export class AppModule { }
