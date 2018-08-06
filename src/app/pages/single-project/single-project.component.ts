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
  isScroll: boolean;
  constructor(private contentService: ContentService,
              private loadingService: LoadingService,
              private activatedRoute: ActivatedRoute,
              @Inject(DOCUMENT) document) {
    this.isLoaded = false;
    this.isScroll = false;
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
    console.log(this.imgHolder.childNodes)
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
        setTimeout(() => {
          this.isScroll = window.innerWidth > document.documentElement.clientWidth;
        }, 1000);

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
      case 'stPatrickGame':
        this.setStyle('#eaeaea');
        break;
      case 'geometryPosters':
        this.setStyle('#232323');
        break;
      case 'pieceOfPlantLogo':
        this.setStyle('#efefef');
        break;
      case 'pieceOfPlantWeb':
        this.setStyle('#efefef');
        break;
      case 'mohaVisualIdentity':
        this.setStyle('#faefdd');
        break;
      case 'theBugWebsite':
        this.setStyle('#e2e2e2');
        break;
      case 'bookyWebApp':
        this.setStyle('#efefef');
        break;
      case 'bookCover':
        this.setStyle('#efefef');
        break;
      case 'valentinesBoo':
        this.setStyle('#f4c5dd');
        break;
      case 'sketchPosters':
        this.setStyle('#e6e6e8');
        break;
      case 'otisBook':
        this.setStyle('#dadada');
        break;
      case 'beforeYouSayAnythingPosters':
        this.setStyle('#eaeaea');
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
  scrollToTop(): void{
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }

}
