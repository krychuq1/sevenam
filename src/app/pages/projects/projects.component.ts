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
  imagesArray: Array<string>;
  state: string;
  isLoading:boolean;
  enableAnimation: boolean;
  constructor( private loadingService: LoadingService){
    this.imagesArray = [];
    this.filter = 'all';
    // this.loadingService.homeLoader.next(true);
    this.state = '';
    this.isLoading = true;
    this.enableAnimation = true;

  }
  test(){
    this.state = 'in';
  }

  public imgLoaded(){
    this.imagesArray.push('loaded');
    console.log('loade', this.imagesArray.length);
    if(this.imagesArray.length === 14){
      // console.log('loaded fucker')
      this.isLoading = false;
      this.loadingService.homeLoader.next(true);
    }
  }
  setFilter(filter){
    console.log('here here here here');
    console.log(this.filter, filter);
    if(this.filter !== filter){
      this.filter = filter;
      this.enableAnimation = false;

      // this.enableAnimation = true;
      setTimeout(() => {
        this.enableAnimation = true;
      },100);
    }


  }

  ngAfterViewInit(): void {
    this.imgHolder = document.getElementById('image-holder');
    console.log(this.imgHolder);
  }
}
