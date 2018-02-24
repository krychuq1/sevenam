import { Component } from '@angular/core';
import {BurgerService} from "../../services/burger.service";

@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  navBurger:boolean;
  constructor(private burgerService: BurgerService){
    this.subscribe();
  }
  public subscribe(){
    this.burgerService.navigation.subscribe(value => {
      this.navBurger = value;
    })
  }

}
