import { Component, OnInit, Input } from '@angular/core';

import { SongData } from  '../../classes/song-data';
import { FavoriteSongsService } from  '../../services/favorite-songs.service';

@Component({
  selector: 'song-data',
  templateUrl: './song-data.component.html',
  styleUrls: ['./song-data.component.css']
})
export class SongDataComponent implements OnInit {
    
    @Input() songData: SongData;
    @Input() songID: number;
    @Input() inputVal: string;
    isHover = false;

    constructor( private favoritesService: FavoriteSongsService) { }

    ngOnInit() {}
    
    addSongToFavorites(){
        this.favoritesService.addToFavorites(this.songData).subscribe(
            success => {   
                this.favoritesService.favoriteSongsListChanged.next({action: 'add', song: this.songData});
                this.songData.isFavorite = true;
            },
            error => {
                if(error.error.toLowerCase() == 'song is already in list'){
                    // if already in list there must have been an error and the heart icon should be full..
                    this.songData.isFavorite = true;
                }
                console.error(error);
            }
        );
    }
    
    removeSongFromFavorites(){
        this.favoritesService.removeFromFavorites(this.songData).subscribe(
            success => {
                this.favoritesService.favoriteSongsListChanged.next({action: 'remove', song: this.songData});
                this.songData.isFavorite = false;
            },
            error => {
                if(error.error.toLowerCase() == 'cannot find song in list'){
                    // if song was not in list there must have been an error and the heart icon should be empty..
                    this.songData.isFavorite = false;
                }
                console.error(error);
            }
        );
    }
    
}
