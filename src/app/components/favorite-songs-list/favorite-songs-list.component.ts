import { Component, OnInit } from '@angular/core';

import { FavoriteSongsService } from '../../services/favorite-songs.service';
import { SongData } from  '../../classes/song-data';

@Component({
  selector: 'favorite-songs-list',
  templateUrl: './favorite-songs-list.component.html',
  styleUrls: ['./favorite-songs-list.component.css']
})
export class FavoriteSongsListComponent implements OnInit {
    
    favoriteSongsArr: SongData[];
    dataStatus = 'waiting';
    
    constructor(private favoritesService: FavoriteSongsService) { }

    ngOnInit() {
        this.favoritesService.getAllFavoriteSongs().subscribe( 
            (favoritesArr: SongData[]) => {
                this.favoriteSongsArr = favoritesArr;
                this.dataStatus = 'ready';
            },
            error => {
                console.log(error);
                this.dataStatus = 'failed';
            }
        ); 
        this.favoritesService.favoriteSongsListChanged.subscribe((change: {action: string, song: SongData}) => {
            if(change.action === 'add'){
                this.favoriteSongsArr.push(change.song);    
            }
            else if(change.action === 'remove'){
                const songUrl = change.song.linkUrl;
                const songIndex = this.favoriteSongsArr.findIndex(songObj => songObj.linkUrl === songUrl);
                if(songIndex > -1){
                    this.favoriteSongsArr.splice(songIndex, 1);
                }
            }
        });
    }

}
