import {AfterViewInit, Component, ElementRef, HostListener} from '@angular/core';
import {LoadingService} from "../../services/loading.service";


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
  isMobile: boolean;
  isLoading:boolean;
  // enableAnimation: boolean;
  constructor( private loadingService: LoadingService, private elRef: ElementRef){
    this.imagesArray = [];
    this.filter = 'all';
    // this.loadingService.homeLoader.next(true);
    this.state = '';
    this.isLoading = true;
    this._checkDevice();
    // this.enableAnimation = true;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event?): void {
    this._checkDevice();
  }
  private _checkDevice() {
    const innerWidth = (window.innerWidth);
    this.isMobile = (innerWidth < 1024);
  }

  test(){
    this.state = 'in';
  }

  public imgLoaded(){
    this.imagesArray.push('loaded');
    console.log('loade', this.imagesArray.length);
    if(this.imagesArray.length === 17){
      this.isLoading = false;
      this.loadingService.homeLoader.next(true);
    }
  }
  setFilter(filter) {
    this.filter = 'off';
    setTimeout(()=>{
      this.filter = filter;
    },450)
    setTimeout(()=> {
      this.filter = filter;

      let hideEl: HTMLCollection;
      hideEl = document.getElementsByClassName('image-container');

      // let i = 0;
      for(let i = 0 ; i < hideEl.length; i++){
        // console.log(i)
        let tempEl: HTMLElement;
        tempEl = hideEl[i] as HTMLElement;
        if(tempEl.classList.contains('hide')){
          tempEl.style.maxHeight = 0 + 'px';
          tempEl.style.width =  '0';

        }else{

          tempEl.style.maxHeight =  this.isMobile ? 1400 + 'px' : '100%';
          tempEl.style.width =  this.isMobile ?  '100%' : '33%'


        }
      }

    },500)
  }
  ngAfterViewInit(): void {
    this.imgHolder = document.getElementById('image-holder');
    console.log(this.imgHolder);
  }
}
