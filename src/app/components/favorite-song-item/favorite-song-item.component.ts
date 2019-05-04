import { Component, OnInit, Input } from '@angular/core';

import { SongData } from  '../../classes/song-data';

@Component({
  selector: 'favorite-song-item',
  templateUrl: './favorite-song-item.component.html',
  styleUrls: ['./favorite-song-item.component.css']
})
export class FavoriteSongItemComponent implements OnInit {
    
    @Input() songData: SongData;

    constructor() {}

    ngOnInit() {}

}
