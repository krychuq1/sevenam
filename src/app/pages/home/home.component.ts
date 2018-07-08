import { Component } from '@angular/core';
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
  enableAnimation = false;
  isLoading:boolean;
  imgUrl: string;
  animationBackground: string;
  maxHeight: string;
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
    // this.animationBoxHover = true;

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
  public addUrlToArray(){
    // this.urlArray.push(
    //
    //  );
    // this.urlArray.push(
    //   {imgUrl:  "../../../assets/images/home/animated-box/valentines.png",
    //   background: "#ededed"}
    // );
    // this.urlArray.push("../../../assets/images/home/animated-box/booky.jpg");
    // this.urlArray.push("../../../assets/images/home/animated-box/booky_logo.jpg");
    // this.urlArray.push("../../../assets/images/home/animated-box/bug.jpg");
    // this.urlArray.push("../../../assets/images/home/animated-box/letsgo.jpg");
    // this.urlArray.push("../../../assets/images/home/animated-box/moha.jpg");
    // this.urlArray.push("../../../assets/images/home/animated-box/moha_logo.jpg");
    // this.urlArray.push("../../../assets/images/home/animated-box/numbers.jpg");
    // this.urlArray.push("../../../assets/images/home/animated-box/otis.jpg");
    // this.urlArray.push("../../../assets/images/home/animated-box/pieceofplant.jpg");
    // this.urlArray.push("../../../assets/images/home/animated-box/rowforwater.jpg");
    // this.urlArray.push("../../../assets/images/home/animated-box/well.jpg");
    // this.urlArray.push("../../../assets/images/home/animated-box/esport.jpg");
    // this.urlArray.push("../../../assets/images/home/animated-box/posterchallange.jpg");
    // this.urlArray.push("../../../assets/images/home/animated-box/stpatrick.jpg");
  }
  public imgLoaded(imgObj){
    this.urlArray.push(imgObj);
    if(this.urlArray.length === 1){
      this.imgUrl = this.urlArray[0]['imgUrl'];
      this.animationBackground = this.urlArray[0]['background'];
      this.maxHeight = this.urlArray[0]['maxHeight'];
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
