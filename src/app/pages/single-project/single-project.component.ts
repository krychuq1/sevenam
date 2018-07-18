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
  key: string;
  isLoaded: boolean;
  imgSrc: string;
  constructor(private contentService: ContentService,
              private loadingService: LoadingService,
              private activatedRoute: ActivatedRoute){
    this.isLoaded = false;
    this.contentUrl = 'page/single-project/';
    this.getContent();
  }

  getContent() {
    this.contentService.getContent(this.contentUrl).then((content) =>{

      this.content = content;
    }, err => {
      console.error(err);
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.projectName = params.projectName;
      this.key = this.paramToCamelCase(this.projectName);
      var img = new Image();
      this.imgSrc = '../assets/images/projects/'+ this.key +'.jpg';
      img.src = this.imgSrc;
      img.onload = () => {
        this.isLoaded = true;
        this.loadingService.homeLoader.next(true);

      };
    });
  }
  paramToCamelCase(param: string): string {
    return param.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
  }

}
