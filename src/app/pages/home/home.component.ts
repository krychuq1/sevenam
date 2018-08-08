import {AfterViewInit, Component, HostListener, Inject} from '@angular/core';
import {BurgerService} from "../../services/burger.service";
import {HttpClient} from "@angular/common/http";
import {LoadingService} from "../../services/loading.service";
import {fade} from "../../animations";
import {ContentService} from "../../services/content.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  animations: fade


})
export class HomeComponent implements AfterViewInit{
  navBurger:boolean;
  urlArray: Array<any>;
  counter: number;
  state = 'in';
  isMobile: boolean;
  enableAnimation = false;
  isLoading:boolean;
  imgUrl: string;
  animationBackground: string;
  maxHeight: string;
  mobileHeight: string;
  backgroundImageCustom: string;
  justifyContent: string;
  homeHover: boolean;
  animationBoxHover: boolean;
  servicesHover: boolean;
  contentUrl: string;
  content: object;
  videoWidth: string;
  videoHeight: string;
  scaleX = 1;
  scaleY = 1;
  constructor(private burgerService: BurgerService, private http: HttpClient,
              private loadingService: LoadingService, private contentService: ContentService,
              @Inject(DOCUMENT) document){
    this.isLoading = true;
    this.homeHover = false;
    this.subscribe();
    this.urlArray = [];
    this.counter = 1;
    this._checkDevice();
    this.contentUrl = 'page/home/';
    this.getContent();

    // this.animationBoxHover = true;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event?): void {
    this._checkDevice();
  }
  getContent() {
    this.contentService.getContent(this.contentUrl).then((content) =>{
      this.content = content;
      console.log(this.content);
    }, err => {
      console.error(err);
    });
  }

  public setLanguage(lan: string){
    localStorage.setItem('lan', lan);
    this.getContent();
    }
  private _checkDevice() {
    const innerWidth = (window.innerWidth);
    this.isMobile = (innerWidth < 1024);
    let videoHeightHolder = window.innerHeight + 10;
    let videoWeightHolder = window.innerWidth * 0.6;
    if(this.isMobile){
      //get width of video holder
      this.videoWidth = window.innerWidth  + 'px';
      //get height of vide holder
      this.videoHeight = '300px';
      videoHeightHolder = 300;
      videoWeightHolder = window.innerWidth;
    }else{
      //get width of video holder
      this.videoWidth = videoWeightHolder + 'px';
      //get height of vide holder
      this.videoHeight = window.innerHeight + 'px';
    }

    //video ratio
    const videoRatio = 1.778;
    //get current height without black bars
    let currentHeightOfVideo = videoWeightHolder / videoRatio;
    //get current width withoud bars
    let currentWidthOfVideo = videoRatio * videoHeightHolder;
    // window.innerHeight / videoRatio;
    // diffrence
    let scaleHeight = videoHeightHolder / currentHeightOfVideo;
    let scaleWidth = videoWeightHolder / currentWidthOfVideo;

      if(scaleHeight > 1){
        this.scaleY = scaleHeight;
        this.scaleX = this.scaleY;
      }
      if(scaleWidth > 1) {
        this.scaleY = scaleWidth;
        this.scaleX = scaleWidth;

      }




  }
  public subscribe(){
    this.burgerService.navigation.subscribe(value => {
      this.navBurger = value;
    })
  }
  public animateBackground(){

    if(this.counter === this.urlArray.length){
      this.counter = 1;
    }else{
      this.counter++;
    }
    this.toggleState();
  }
  public imgLoaded(imgObj){
    this.urlArray.push(imgObj);
    //13
    if(this.urlArray.length === 16){


      this.imgUrl = this.urlArray[0]['imgUrl'];
      this.animationBackground = this.urlArray[0]['background'];
      this.maxHeight = this.urlArray[0]['maxHeight'];
      this.mobileHeight = this.urlArray[0]['mobileHeight'];

      if(this.urlArray[0]['backgroundImage']){
        this.backgroundImageCustom = this.urlArray[0]['backgroundImage'];
        // this.backgroundImageCustom = true;
      }else{
        this.backgroundImageCustom = undefined;
      }
      if(this.urlArray[0]['justifyContent']){
      }
      this.justifyContent = this.urlArray[0]['justifyContent'] ? this.urlArray[0]['justifyContent']  : 'center';
      // console.log(this.backgroundImageCustom);
      this.isLoading = false;
      this.loadingService.homeLoader.next(true);
      console.log(document.getElementById('ytPlayer'));

      // document.getElementById('ytPlayer').style.width = this.videoWidth;
      setInterval(()=>{
        this.animateBackground();
      }, 4000);
    }
  }

  onDone($event) {
    if(this.state === 'out'){
      this.imgUrl = this.urlArray[this.counter - 1]['imgUrl'];
      this.animationBackground = this.urlArray[this.counter - 1]['background'];
      this.maxHeight = this.urlArray[this.counter - 1]['maxHeight'];
      this.mobileHeight = this.urlArray[this.counter -1]['mobileHeight'];
      if(this.urlArray[this.counter -1]['backgroundImage']){
        this.backgroundImageCustom = this.urlArray[this.counter -1]['backgroundImage'];
      }else{
        this.backgroundImageCustom = undefined;
      }
      this.justifyContent = this.urlArray[this.counter -1]['justifyContent'] ? this.urlArray[this.counter -1]['justifyContent']  : 'center';

      if(this.state === 'out'){
        this.toggleState();
      }
    }
  }

  toggleState() {
    this.state = this.state === 'in' ? 'out' : 'in';
    if(this.state === 'out'){
      // setTimeout(()=>{
      //   this.toggleState();
      //   this.imgUrl = this.urlArray[this.counter];
      //
      // }, 510)
    }
  }

  ngAfterViewInit(): void {
    setTimeout(()=> {
      if(!this.isMobile ){
        document.getElementsByTagName('iframe')[2].removeAttribute('style');
        document.getElementsByTagName('iframe')[2].setAttribute('style', 'outline: none !important; visibility: visible !important; resize: none !important; box-shadow: none !important; overflow: visible !important; background: none transparent !important; opacity: 1 !important; position: fixed !important; border: 0px !important; padding: 0px !important; transition-property: none !important; z-index: 1000001 !important; cursor: auto !important; float: none !important; height: 66px !important; min-height: 66px !important; max-height: 66px !important; width: 62px !important; min-width: 62px !important; max-width: 62px !important; transform: rotate(0deg) translateZ(0px) !important; transform-origin: 0px center 0px !important; margin: 0px !important; top: auto !important; bottom: 50px !important; right: 15px !important; left: auto !important; display: block !important;');
      }


    },1000);

  }
}
