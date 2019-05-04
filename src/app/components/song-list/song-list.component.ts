import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, forkJoin, of } from  'rxjs';
import { catchError } from  'rxjs/operators';
import { SongDataService } from  '../../services/song-data.service';
import { FavoriteSongsService } from '../../services/favorite-songs.service';
import { SongData } from  '../../classes/song-data';

@Component({
  selector: 'song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {
    
    @Input() inputVal: string;
    @Output() dataReady = new EventEmitter<boolean>();
    songDataArr: SongData[];
    dataStatus = 'waiting';
    isFavoritesDataFailed = false;
    songListObsrv: Observable<any>;
    songFavoritesObsrv: Observable<any>;

    constructor(private songDataService: SongDataService, private favoritesService: FavoriteSongsService) { }

    ngOnInit() {
        this.songListObsrv = this.songDataService.getAllSong().pipe(
            catchError(error => {
                console.log(error);
                return of(error);
            })
        );
        this.songFavoritesObsrv = this.favoritesService.getAllFavoriteSongs().pipe(
            catchError(error => {
                console.log(error);
                this.isFavoritesDataFailed = true;
                return of(error);
            })
        );
        forkJoin(this.songListObsrv, this.songFavoritesObsrv).subscribe(
            data => {
                if(data[0] instanceof HttpErrorResponse){
                    this.dataStatus = 'failed';
                    // no need to check favorites data if song list data not available...
                    return;
                }
                this.songDataArr = data[0];
                if(!this.isFavoritesDataFailed){
                    const favoriteSongs = data[1];
                    this.updateFavoritesInSongsArr(this.songDataArr, favoriteSongs);
                }
                this.dataStatus = 'ready';
                this.dataReady.emit(true);
            }
        );
    }
    
    updateFavoritesInSongsArr(allSongs: SongData[], favorites: SongData[]){
        if(favorites.length == 0){
            allSongs.forEach(songObj => songObj.isFavorite = false);
        }
        else{
            // create a map to search more efficiently..
            const allSongsMap = new Map();
            allSongs.forEach(songObj => {
                allSongsMap.set(songObj.linkUrl, songObj);
            })
            favorites.forEach(favoriteSongObj => {
                // update favorites..
                const songObj = allSongsMap.get(favoriteSongObj.linkUrl);
                if(songObj && songObj["isFavorite"] === undefined){
                    songObj["isFavorite"] = true;
                }
            });
            allSongs.forEach(songObj => {
                // update all else..
                if(songObj && songObj.isFavorite === undefined){
                    /* if this property is undefined then no icons would display at all (because it means there was an error
                    fetching the data from the server and therefore in the view the *ngIf condition will hide the icon 
                    container element), so if a song is not in favorites list we sets its property to false  */
                    songObj.isFavorite = false;
                }
            })
        }
    }

}
