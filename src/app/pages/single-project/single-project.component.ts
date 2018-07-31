import {Component, Inject, OnInit} from '@angular/core';
import {ContentService} from "../../services/content.service";
import {LoadingService} from "../../services/loading.service";
import {ActivatedRoute} from "@angular/router";
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'singleProject',
  templateUrl: './single-project.html',
  styleUrls: ['./single-project.scss']
})
export class SingleProjectComponent implements OnInit {
  contentUrl: string;
  content: object;
  projectName: string;
  key: string;
  isLoaded: boolean;
  imgSrc: string;
  imgHolder: HTMLElement;
  constructor(private contentService: ContentService,
              private loadingService: LoadingService,
              private activatedRoute: ActivatedRoute,
              @Inject(DOCUMENT) document) {
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
    this.imgHolder = document.getElementById('singleImgHolder');
    // mohaLogo #f9efdc
    this.activatedRoute.params.subscribe(params => {
      console.log(this.imgHolder, document.getElementById('singleImgHolder'),
        document.getElementById('singleImgHolder'));

      this.projectName = params.projectName;
      this.key = this.paramToCamelCase(this.projectName);
      var img = new Image();
      this.setBackground(this.key);
      this.imgSrc = '../assets/images/projects/' + this.key + '.jpg';
      img.src = this.imgSrc;
      img.onload = () => {
        this.isLoaded = true;
        this.loadingService.homeLoader.next(true);

      };
      img.onerror = () => {
        this.imgSrc = '../assets/images/projects/' + this.key + '.png';
        img.src =  this.imgSrc;
      };
    });
  }
  setBackground(projectName: string): void {
    switch (projectName) {
      case 'mohaLogo':
        this.setStyle('#f9efdc');
        break;
      case 'esportLogo':
        this.setStyle('#f4f4f4');
        break;
      case 'rowForWaterLogo':
        this.setStyle('#f4f4f4');
        break;
      case 'theBugLogo':
        this.setStyle('#323232');
        break;
      case 'bookyLogo':
        this.setStyle('#f4f4f4');
        break;
    }

  }
  setStyle(backgroundColor: string) {
    this.imgHolder.style.backgroundColor = backgroundColor;
    this.imgHolder.style.padding = '30px';

  }

  paramToCamelCase(param: string): string {
    return param.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
  }

}
