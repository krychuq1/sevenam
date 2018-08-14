import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";


@Injectable()
export class LanguageService {
  public changeLanguage: EventEmitter<string> = new EventEmitter();

  constructor() {
  }
  public setLanguage(lan: string) {
    localStorage.setItem('lan', lan);
    this.changeLanguage.next('lan');
  }
}


