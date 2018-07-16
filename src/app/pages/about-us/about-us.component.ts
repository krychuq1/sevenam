import { Component } from '@angular/core';
import {ContentService} from "../../services/content.service";

@Component({
  selector: 'aboutUs',
  templateUrl: './about-us.html',
  styleUrls: ['./about-us.scss']
})
export class AboutUsComponent {
  contentUrl: string;
  content: object;

  constructor(private contentService: ContentService){
    this.contentUrl = 'page/about-us/';
    this.getContent();
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
