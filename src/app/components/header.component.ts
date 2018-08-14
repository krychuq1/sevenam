import {Component, ElementRef, ViewChild} from '@angular/core';
import {BurgerService} from "../services/burger.service";
import {LoadingService} from "../services/loading.service";
import {ContentService} from "../services/content.service";
import {Router} from "@angular/router";
import {LanguageService} from "../services/language.service";

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
  navAllow: boolean;
  @ViewChild('headerHolder') headerHolder: ElementRef;

  constructor(private burgerService: BurgerService,
              private loadingService: LoadingService,
              private contentService: ContentService,
              public router: Router, private languageService: LanguageService){
    this.contentUrl = 'component/header/';
    this.navBurger = false;
    this.isHomeLoaded = false;
    this.navAllow = true;
    this.homeLoader();
    this.getContent();
  }
  public setLanguage(lan: string){
    console.log(this.languageService);
    this.languageService.setLanguage(lan);
    this.getContent();
  }


  public openBurger(){

    let headerHolder: HTMLElement = this.headerHolder.nativeElement;
    if(this.navAllow) {
      this.navAllow = false;
      // console.log();
      // headerHolder.style.height = '100vh';
      this.navBurger = !this.navBurger;
      this.getContent();
      if(this.navBurger){
        document.body.style.height = '100vh';
        document.body.style.overflow = 'hidden';
        headerHolder.style.height = '0';
        headerHolder.classList.add('is-active');
        setTimeout(()=>{
          headerHolder.style.height = '110vh';
          this.navAllow = true;
        },100);
      }else{
        document.body.style.height = 'auto';
        document.body.style.overflow = 'visible';
        headerHolder.classList.remove('is-active');
        setTimeout(() => {
          headerHolder.style.height = '114px';
          this.navAllow = true;

        }, 800);
    }
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
    }, err => {
      console.error(err);
    });
  }
}
