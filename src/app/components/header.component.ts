import { Component } from '@angular/core';
import {BurgerService} from "../services/burger.service";
import {LoadingService} from "../services/loading.service";
import {ContentService} from "../services/content.service";

@Component({
  selector: 'header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  navBurger: boolean;
  isHomeLoaded: boolean;
  contentUrl: string;
  content: object;
  constructor(private burgerService: BurgerService,
              private loadingService: LoadingService,
              private contentService: ContentService){
    this.contentUrl = 'component/header/';
    this.navBurger = false;
    this.isHomeLoaded = false;
    this.homeLoader();
    this.getContent();
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
  getContent() {
    this.contentService.getContent(this.contentUrl).then((content) =>{
      this.content = content;
      console.log(this.content);
    }, err => {
      console.error(err);
    });
  }


}
