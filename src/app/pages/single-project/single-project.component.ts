import {Component, OnInit} from '@angular/core';
import {ContentService} from "../../services/content.service";
import {LoadingService} from "../../services/loading.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'singleProject',
  templateUrl: './single-project.html',
  styleUrls: ['./single-project.scss']
})
export class SingleProjectComponent implements OnInit{
  contentUrl: string;
  content: object;
  projectName: string;
  constructor(private contentService: ContentService,
              private loadingService: LoadingService,
              private activatedRoute: ActivatedRoute){
    this.contentUrl = 'page/single-project/';
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

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.projectName = params.projectName;
      console.log(this.projectName);
      this.loadingService.homeLoader.next(true);

    });
  }

}
