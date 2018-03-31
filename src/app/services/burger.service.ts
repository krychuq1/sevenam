import { Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";


@Injectable()
export class BurgerService{
  navBurger:boolean;
  public navigation: Subject<boolean> = new Subject();
  constructor(){
  }

}
