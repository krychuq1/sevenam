import {Component, HostListener} from '@angular/core';
import {BurgerService} from "../../services/burger.service";
import {HttpClient} from "@angular/common/http";
import {LoadingService} from "../../services/loading.service";
import {fade} from "../../animations";

@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  animations: fade

})
export class HomeComponent {
  navBurger:boolean;
  urlArray: Array<any>;
  counter: number;
  state = 'in';
  isMobile; boolean;
  enableAnimation = false;
  isLoading:boolean;
  imgUrl: string;
  animationBackground: string;
  maxHeight: string;
  mobileHeight: string;
  backgroundImageCustom: string;
  homeHover: boolean;
  animationBoxHover: boolean;
  servicesHover: boolean;
  constructor(private burgerService: BurgerService, private http: HttpClient,
              private loadingService: LoadingService){
    this.isLoading = true;
    this.homeHover = false;
    this.subscribe();
    this.urlArray = [];
    this.counter = 1;
    this._checkDevice();

    // this.animationBoxHover = true;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event?): void {
    this._checkDevice();
  }
  private _checkDevice() {
    const innerWidth = (window.innerWidth);
    this.isMobile = (innerWidth < 1024);
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
    if(this.urlArray.length === 13){

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
      console.log(this.backgroundImageCustom);
      this.isLoading = false;
      this.loadingService.homeLoader.next(true);
      setInterval(()=>{
        this.animateBackground();
      }, 4000);
    }
  }

  onDone($event) {
    console.log('animation done', this.state, this.counter, this.urlArray[this.counter]);
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
      console.log(this.backgroundImageCustom);

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
}
