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
    this.burgerService.navigation.next(this.navBurger);

  }

}
