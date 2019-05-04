import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    
    @ViewChild('header', { read: ElementRef }) header: ElementRef;
    inputVal: string;
    inputPlaceholder = `Start typing song name...`;
    minHeight: string;
    containerMrgnBtm = 50;
    isShowMainContent = false;
    
    constructor(){}
    
    ngOnInit(){
        if(this.header && this.header.nativeElement.firstChild){
            const headerHeight = this.header.nativeElement.firstChild.offsetHeight;
            this.minHeight = `calc(100vh - ${headerHeight + this.containerMrgnBtm}px)`;
        }
        else{
            this.minHeight = `1000px`;
        }
        this.isShowMainContent = true;
    }
} 
