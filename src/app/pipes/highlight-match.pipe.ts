import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightMatch'
})
export class HighlightMatchPipe implements PipeTransform {

  transform(songName: string, inputVal: string): any {
      if(inputVal === undefined){
          return songName;
      }
      const matchIndex = songName.toLowerCase().indexOf(inputVal); 
      const lettersUntilMatch = songName.substring(0, matchIndex);
      const caseAdjustedInput = songName.substring(matchIndex, matchIndex + inputVal.length);
      const lettersAfterMatch = songName.substring(matchIndex + inputVal.length);
      const styledName = `${lettersUntilMatch}<span class="text-primary">${caseAdjustedInput}</span>${lettersAfterMatch}`;
      return styledName;
  }

}
