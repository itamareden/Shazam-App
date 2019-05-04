import { Pipe, PipeTransform } from '@angular/core';

import { SongData } from  '../classes/song-data';

@Pipe({
  name: 'songFilter'
})
export class SongFilterPipe implements PipeTransform {

  transform(songs: SongData[], inputVal: string): any {
      let filteredList = [];
      if(inputVal === undefined){
          return songs;
      }
      if(!!songs){
          filteredList = songs.filter(song => song.title.toLowerCase().indexOf(inputVal) > -1);
          return filteredList;
      }
      return songs;
  }

}
  