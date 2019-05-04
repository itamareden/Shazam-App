import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from  'rxjs';
import { map } from  'rxjs/operators';
import { SongData } from  '../classes/song-data';

@Injectable({
  providedIn: 'root'    
})
export class SongDataService { 
    
    private token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF2aXZAY3ljdXJpdHkuY29tIiwibmFtZSI6ImF2aXYiLCJpYXQiOjE1NTQ4ODIyOTl9._cLVE40a47NXHENdLCd8L4AGaORzJs8vkIMFIt4WyWU`;
    private header = new  HttpHeaders().append("Authorization", this.token);
    private url = `https://fullstack-test-server.herokuapp.com/api/songs`;
    
    constructor(private  http: HttpClient) {}
    
    getAllSong(): Observable<SongData[]> { 
        return this.http.get(this.url, {headers: this.header}).pipe(map(data => this.mapSongsData(data)));
    }
    
    private mapSongsData(dataObj:any): SongData[]{
        const songsRawObjArr = dataObj.chart;
        const songDataArr = songsRawObjArr.map(songObj => {
            const title = songObj.heading.title;
            const subtitle = songObj.heading.subtitle;
            const imageSrc = songObj.images.default;
            const linkUrl = songObj.url;
            const songData = new SongData(title, subtitle, imageSrc, linkUrl);
            return songData;
        });
        return songDataArr;
    }
    
}
