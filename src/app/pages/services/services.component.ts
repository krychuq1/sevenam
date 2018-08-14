import { Component } from '@angular/core';
import {LoadingService} from "../../services/loading.service";
import {ContentService} from "../../services/content.service";
import {LanguageService} from "../../services/language.service";

@Component({
  selector: 'services',
  templateUrl: './services.html',
  styleUrls: ['./services.scss']
})
export class ServicesComponent {
  packages;
  contentUrl: string;
  content: object;
  constructor(private loadingService: LoadingService,
              private contentService: ContentService,
              private languageService: LanguageService){
    this.packages = {
      first: false,
      second: false,
      third: false
    };

    this.contentUrl = 'page/services/';
    this.getContent();
    this.loadingService.homeLoader.next(true);
    this.languageService.changeLanguage.subscribe(()=>{
      this.getContent();
    })
  }
  getContent() {
    this.contentService.getContent(this.contentUrl).then((content) =>{
      this.content = content;
      console.log(this.content);
    }, err => {
      console.error(err);
    });
  }
  setPackages(packageName){
    switch(packageName) {
      case 'first':
        this.packages.first = !this.packages.first;
        break;
      case 'second':
        this.packages.second = !this.packages.second;
        break;
      case 'third':
        this.packages.third = !this.packages.third;
        break;
    }
    // this.packages.first = first;
    // this.packages.second = second;
    // this.packages.third = third;
  }

}
