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
  projectHover: boolean;

  // enableAnimation: boolean;
  constructor( private loadingService: LoadingService, private elRef: ElementRef){
    this.imagesArray = [];
    this.filter = 'all';
    // this.loadingService.homeLoader.next(true);
    this.state = '';
    this.isLoading = true;
    this.isMobile = ((window.innerWidth) < 1024);
    this.projectHover = false;

    this._checkDevice();
    // this.enableAnimation = true;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event?): void {
    this._checkDevice();
  }
  private _checkDevice() {
    const innerWidth = (window.innerWidth);
    //check if state is diff
    let tempState = (innerWidth < 1024);
    if(this.isMobile != tempState) {
      this.isMobile = (innerWidth < 1024);
      this.loopElements();
    }
  }

  test(){
    this.state = 'in';
  }

  public imgLoaded(){
    this.imagesArray.push('loaded');
    console.log('loade', this.imagesArray.length);
    if(this.imagesArray.length === 21){
      this.isLoading = false;
      this.loadingService.homeLoader.next(true);
    }
  }
  setFilter(filter) {
    this.filter = 'off';
    setTimeout(()=>{
      this.filter = filter;
    },450);
    setTimeout(()=> {
      this.filter = filter;
      this.loopElements();
    },500)
  }
  hover(className: string){
    // this.projectHover = value;
    if(!this.projectHover &&  !this.isMobile) {

      let myEl: HTMLCollection;
      let myShown: Array<HTMLElement>;
      myShown = [];
      // get all of project images
      myEl = document.getElementsByClassName('image-container');
      for(let i = 0 ; i < myEl.length; i++) {
        //find  hovered element
        if(myEl[i].classList.contains('show')){
          let tempEl = myEl[i] as HTMLElement;
          if(myEl[i].classList.contains(className)){
            tempEl.classList.add('customAnimation');
          }
          myShown.push(tempEl);

        }
      }
      let rowNumber: number;
      let position: number;
      let indexPosition: number;
      for(let b = 0; b < myShown.length; b++){
        // if(myShown.length <= 3){
          if(myShown[b].classList.contains('customAnimation')){
            rowNumber = Math.ceil((b+1)/3);
            position = Math.round((rowNumber - 1 - (b+1)/3) * -1 * 100) / 100;
            indexPosition = b;
            console.log(position);
            switch (position){
              case 1:
                if(myShown[indexPosition-1]){
                    myShown[indexPosition-1].classList.add('customAnimation1');
                    myShown[indexPosition-1].style.width = '30%';
                    myShown[indexPosition-1].style.height = 'calc(70vh - 35px)';
                }
                if(myShown[indexPosition-2]){
                  myShown[indexPosition-2].classList.add('customAnimation1');
                  myShown[indexPosition-2].style.width = '30%';
                  myShown[indexPosition-2].style.height = 'calc(70vh - 35px)';
                }
                break;
              case 0.67:
                if(myShown[indexPosition-1]){
                  myShown[indexPosition-1].classList.add('customAnimation1');
                  myShown[indexPosition-1].style.width = '30%';
                  myShown[indexPosition-1].style.height = 'calc(70vh - 35px)';
                }
                if(myShown[indexPosition+1]){
                  myShown[indexPosition+1].classList.add('customAnimation1');
                  myShown[indexPosition+1].style.width = '30%';
                  myShown[indexPosition+1].style.height = 'calc(70vh - 35px)';
                }
                break;
              case 0.33:
                if(myShown[indexPosition+2]){
                  myShown[indexPosition+2].classList.add('customAnimation1');
                  myShown[indexPosition+2].style.width = '30%';
                  myShown[indexPosition+2].style.height = 'calc(70vh - 35px)';
                }
                if(myShown[indexPosition+1]){
                  myShown[indexPosition+1].classList.add('customAnimation1');
                  myShown[indexPosition+1].style.width = '30%';
                  myShown[indexPosition+1].style.height = 'calc(70vh - 35px)';
                }


            }


            myShown[b].style.width = '39%';
            myShown[b].style.height = 'calc(70vh - 35px)';
          }
          // else{
          //   myShown[b].classList.add('customAnimation1');
          //   myShown[b].style.width = '30%';
          //   myShown[b].style.height = 'calc(70vh - 35px)';
          // }
        // }
      }
        this.projectHover = true;



      // tempEl.style.width = '40%';
      // tempEl.style.height = 'calc(70vh - 35px)';
    }
  }
  hoverLeave() {
    let myEl: HTMLCollection;
    // get all of project images
    myEl = document.getElementsByClassName('image-container');
    if(!this.isMobile && this.projectHover){

      for (let i = 0; i < myEl.length; i++) {
        //find  hovered element
        if (myEl[i].classList.contains('show') && myEl[i].classList.contains('customAnimation')) {
          let tempEl = myEl[i] as HTMLElement;
          tempEl.classList.remove('customAnimation');
          tempEl.style.width = 'calc(100vw/3)';
          tempEl.style.height = 'calc(50vh - 35px)';
        }
        if (myEl[i].classList.contains('show') && myEl[i].classList.contains('customAnimation1')) {
          let tempEl = myEl[i] as HTMLElement;
          tempEl.classList.remove('customAnimation1');
          tempEl.style.width = 'calc(100vw/3)';
          tempEl.style.height = 'calc(50vh - 35px)';
        }

        }
      this.projectHover = false;

    }


  }

  loopElements(): void{
    let hideEl: HTMLCollection;
    hideEl = document.getElementsByClassName('image-container');

    // let i = 0;
    for(let i = 0 ; i < hideEl.length; i++) {
      // console.log(i)
      let tempEl: HTMLElement;
      tempEl = hideEl[i] as HTMLElement;
      if(tempEl.classList.contains('hide')){
        tempEl.style.maxHeight = 0 + 'px';
        tempEl.style.width =  '0';
      }else{
        tempEl.style.maxHeight =  this.isMobile ? 1400 + 'px' : '100%';
        tempEl.style.width =  this.isMobile ?  '100%' : '33.333%'

      }
    }
  }

  ngAfterViewInit(): void {
    this.imgHolder = document.getElementById('image-holder');
    console.log(this.imgHolder);
  }
}
