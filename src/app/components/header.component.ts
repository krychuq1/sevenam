import { Component } from '@angular/core';
import {BurgerService} from "../services/burger.service";
import {LoadingService} from "../services/loading.service";

@Component({
  selector: 'header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  navBurger:boolean;
  isHomeLoaded: boolean;
  constructor(private burgerService: BurgerService, private loadingService: LoadingService){
    this.navBurger = false;
    this.isHomeLoaded = false;
    this.homeLoader();
  }
  public openBurger(){
    this.navBurger = !this.navBurger;
    if(this.navBurger){
      document.body.style.height = '100vh';
      document.body.style.overflow = 'hidden';
    }else{
      document.body.style.height = 'auto';
      document.body.style.overflow = 'visible';
    }
    this.burgerService.navigation.next(this.navBurger);
  }
  public onNavigate(url){
    window.open(url, "_blank");
  }

  public homeLoader(){
    this.loadingService.homeLoader.subscribe(value => {
        this.isHomeLoaded = value;
    })
  }


}
