import { Component } from '@angular/core';
import {BurgerService} from "../services/burger.service";

@Component({
  selector: 'header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  navBurger:boolean;
  constructor(private burgerService: BurgerService){
    this.navBurger = false;
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

}
