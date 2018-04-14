import {AfterViewInit, Component} from '@angular/core';
import {LoadingService} from "../../services/loading.service";
// import {scrollUp} from "../../animations";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Observable} from "rxjs/Observable";

@Component({
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss']
})
// animations: scrollUp

export class ProjectsComponent  implements AfterViewInit{
  filter: string;
  imgHolder: HTMLElement;
  obsVar;
  state: string;
  constructor( private loadingService: LoadingService){
    this.filter = 'all';
    this.loadingService.homeLoader.next(true);
    this.state = '';
  }
  test(){
    this.state = 'in';
  }


  setFilter(filter){
    this.filter = filter;
   // this.imgHolder = document.getElementById('image-holder');
   console.log(window.innerHeight, ' <----- this is height');
   let testimg;
   /*
      // timeout
      setTimeout( ()=> {
        let visibleImages = document.getElementsByClassName("show");
        for(let img of <any>visibleImages){
          img.style.position = 'absolute';
          img.style.bottom = '0';
          testimg = img;

        }
        let bottom = 0;
      },20);
  */
  }

  ngAfterViewInit(): void {
    this.imgHolder = document.getElementById('image-holder');
    console.log(this.imgHolder);
  }
}
