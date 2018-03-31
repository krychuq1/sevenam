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
  imagesArray: Array<string>;
  urlArray: Array<string>;
  counter: number;
  state = 'in';
  enableAnimation = false;
  isLoading:boolean;
  imgUrl:string;
  constructor(private burgerService: BurgerService, private http: HttpClient,
              private loadingService: LoadingService){
    this.isLoading = true;
    this.subscribe();
    this.imagesArray = [];
    this.urlArray = [];
    this.counter = 1;
  }
  public subscribe(){
    this.burgerService.navigation.subscribe(value => {
      this.navBurger = value;
    })
  }
  public animateBackground(){

    if(this.counter == 11)
      this.counter = 0;
      this.toggleState();
    this.counter++;
  }
  public addUrlToArray(){
    this.urlArray.push("../../../assets/images/home/animated-box/booky.jpg");
    this.urlArray.push("../../../assets/images/home/animated-box/booky_logo.jpg");
    this.urlArray.push("../../../assets/images/home/animated-box/bug.jpg");
    this.urlArray.push("../../../assets/images/home/animated-box/letsgo.jpg");
    this.urlArray.push("../../../assets/images/home/animated-box/moha.jpg");
    this.urlArray.push("../../../assets/images/home/animated-box/moha_logo.jpg");
    this.urlArray.push("../../../assets/images/home/animated-box/numbers.jpg");
    this.urlArray.push("../../../assets/images/home/animated-box/otis.jpg");
    this.urlArray.push("../../../assets/images/home/animated-box/pieceofplant.jpg");
    this.urlArray.push("../../../assets/images/home/animated-box/rowforwater.jpg");
    this.urlArray.push("../../../assets/images/home/animated-box/valentines.jpg");
    this.urlArray.push("../../../assets/images/home/animated-box/well.jpg");

  }
  public imgLoaded(){
    this.imagesArray.push('loaded');
    if(this.imagesArray.length === 14){
      this.addUrlToArray();
      this.imgUrl = this.urlArray[0];
      this.isLoading = false;
      this.loadingService.homeLoader.next(true);
      setInterval(()=>{
        this.animateBackground();
      }, 4000);
    }
  }
  onClick() {
    this.enableAnimation = true;
    this.counter = 0;
    this.toggleState();
  }



  onDone($event) {
    console.log('animation done', this.state);
    if(this.state === 'out'){
      this.imgUrl = this.urlArray[this.counter];
      // this.toggleState();
    }

  }

  toggleState() {
    this.state = this.state === 'in' ? 'out' : 'in';
    if(this.state === 'out'){

      setTimeout(()=>{
        this.toggleState();
        this.imgUrl = this.urlArray[this.counter];

      }, 500)
    }
  }
}
