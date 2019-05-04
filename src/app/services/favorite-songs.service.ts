import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from  'rxjs';
import { map } from  'rxjs/operators';
import { SongData } from  '../classes/song-data';

@Injectable({
  providedIn: 'root'
})
export class FavoriteSongsService { 
    
    private baseUrl = `http://localhost:2121/api`;
    favoriteSongsListChanged = new Subject();
    
    constructor(private  http: HttpClient) {}
    
    getAllFavoriteSongs(): Observable<SongData[]> {
        return this.http.get(`${this.baseUrl}/getAllFavorites`).pipe(
            map((dataObj:any) => this.mapSongsData(dataObj))
        );
    }
    
    addToFavorites(song: SongData): Observable<any> {   
        const  body = {song: song};
        return this.http.post(`${this.baseUrl}/addToFavorites`, body);
    }
    
    removeFromFavorites(song: SongData): Observable<any> {
        const  body = {song: song};
        return this.http.post(`${this.baseUrl}/removeFromFavorites`, body);
    }
    
    
    private mapSongsData(dataObj: any): SongData[]{
        const favorites = dataObj.favorites;
        const songDataArr = favorites.map(songObj => {
            const title = songObj._title;
            const subtitle = songObj._subtitle;
            const imageSrc = songObj._imageSrc;
            const linkUrl = songObj._linkUrl;
            const songData = new SongData(title, subtitle, imageSrc, linkUrl);
            return songData;
        });
        return songDataArr;
    }
    
} 
 