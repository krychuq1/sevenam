import { Component } from '@angular/core';
import {ContentService} from "../../services/content.service";
import {LoadingService} from "../../services/loading.service";
import {LanguageService} from "../../services/language.service";
import {Router} from "@angular/router";

@Component({
  selector: 'aboutUs',
  templateUrl: './about-us.html',
  styleUrls: ['./about-us.scss']
})
export class AboutUsComponent {
  contentUrl: string;
  content: object;

  constructor(private contentService: ContentService,
              private loadingService: LoadingService,
              private languageService: LanguageService,
              public router: Router){
    this.contentUrl = 'page/about-us/';
    this.getContent();
    this.loadingService.homeLoader.next(true);
    this.languageService.changeLanguage.subscribe(()=>{
      this.getContent();
    });
  }
  
  getContent() {
    this.contentService.getContent(this.contentUrl).then((content) =>{
      this.content = content;
      console.log(this.content);
    }, err => {
      console.error(err);
    });
  }

}
