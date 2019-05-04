export class SongData {
    
    private _title: string;
    private _subtitle: string;
    private _imageSrc: string;
    private _linkUrl: string;
    private _isFavorite: boolean;
    
    constructor(title: string, subtitle: string, imageSrc: string, linkUrl: string, isFavorite?: boolean){
        this._title = title;
        this._subtitle = subtitle;
        this._imageSrc = imageSrc;
        this._linkUrl = linkUrl;
        this._isFavorite = isFavorite;
    }
    
    get title(): string {
        return this._title;
    }

    get subtitle(): string {
        return this._subtitle;
    }
    
    get imageSrc(): string {
        return this._imageSrc;
    }
    
    get linkUrl(): string {
        return this._linkUrl;
    }
    
    get isFavorite(): boolean {
        return this._isFavorite;
    }
    
    set isFavorite(value: boolean) {
        this._isFavorite = value;
    }
}
