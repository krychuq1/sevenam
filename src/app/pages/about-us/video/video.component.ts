import { Component } from '@angular/core';
import {ContentService} from "../../../services/content.service";
import {LoadingService} from "../../../services/loading.service";

@Component ({
  selector: 'videoComponent',
  templateUrl: './video.html',
  styleUrls: ['./video.scss']
})
export class VideoComponent {
  contentUrl: string;
  content: object;
  constructor(private contentService: ContentService, private loadingService: LoadingService){
    this.contentUrl = 'page/video/';
    this.getContent();
    this.loadingService.homeLoader.next(true);

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
