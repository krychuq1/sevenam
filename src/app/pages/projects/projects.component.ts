import {AfterViewInit, asNativeElements, Component, ElementRef, HostListener, Inject, ViewChild} from '@angular/core';
import {LoadingService} from "../../services/loading.service";
import {DOCUMENT} from "@angular/common";


@Component({
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss']
})
// animations: scrollUp

export class ProjectsComponent  implements AfterViewInit{
  @ViewChild('moha_logo_img') myId: ElementRef;

  filter: string;
  imgHolder: HTMLElement;
  imagesArray: Array<string>;
  state: string;
  isMobile: boolean;
  isLoading:boolean;
  projectHover: boolean;
  defaultMaxHeight: object;

  // enableAnimation: boolean;
  constructor( private loadingService: LoadingService, private elRef: ElementRef,
               @Inject(DOCUMENT) document){
    this.imagesArray = [];
    this.filter = 'all';
    // this.loadingService.homeLoader.next(true);
    this.state = '';
    this.isLoading = true;
    this.isMobile = ((window.innerWidth) < 1024);
    this.projectHover = false;
    this._defaultMaxHeight();
    this._checkDevice();
    // this.enableAnimation = true;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event?): void {
    this._checkDevice();
  }
  private _defaultMaxHeight(){
    this.defaultMaxHeight = {
      //poster
      posterchallange: {default: '85%', animate: '60%'},
      //moha
      mohaLogo: {default: '30%', animate: '20%'},
      //esport
      esport: {default: '15%', animate: '10%'},
      //otis
      otis: {default: '75%', animate: '50%'},
      //well
      well: {default: '60%', animate: '60%'},
      //pieceofplant
      pieceofplant: {default: '30%', animate: '20%'},
      //bug
      bug: {default: '40%', animate: '20%'},
      //mohaVisual
      mohaVisual: {default: '70%', animate: '45%'},
      //rowforwater
      rowforwater: {default: '30%', animate: '20%'},
      //valentines
      valentines: {default: '60%', animate: '40%'},
      //webBug
      webBug: {default: '15%', animate: '10%'},
      //bookcover
      bookcover: {default: '70%', animate: '50%'},
    //let go
      letsgo: {default: '50%', animate: '35%'},
     //st patrick
      stpatrick: {default: '60%', animate: '40%'},
    //booky
      booky: {default: '20%', animate: '15%'},
    //geometry
      geometry: {default: '62%', animate: '40%'},
    //bookyWeb
      bookyWeb: {default: '70%', animate: '50%'},
    //leaf
    leaf: {default: '45%', animate: '30%'},
    };
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
    console.log('on hover', className);

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
                  this.setStyleOnHover(myShown,indexPosition-1);
                }
                if(myShown[indexPosition-2]){
                  this.setStyleOnHover(myShown,indexPosition-2);

                }
                break;
              case 0.67:
                if(myShown[indexPosition-1]){
                  this.setStyleOnHover(myShown,indexPosition-1);

                }
                if(myShown[indexPosition+1]){
                  this.setStyleOnHover(myShown,indexPosition+1);

                }
                break;
              case 0.33:
                if(myShown[indexPosition+2]){
                  this.setStyleOnHover(myShown,indexPosition+2);

                }
                if(myShown[indexPosition+1]){
                  this.setStyleOnHover(myShown,indexPosition+1);

                }


            }
            myShown[b].style.width = '39%';
            myShown[b].style.height = 'calc(60vh - 35px)';
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
  setStyleOnHover(myShown, index){
    let img = myShown[index].childNodes[0] as HTMLElement;
      img.style.maxHeight = this.defaultMaxHeight[img.id].animate;
      myShown[index].classList.add('customAnimation1');
      myShown[index].style.width = '30%';
      myShown[index].style.height = 'calc(60vh - 35px)';
    // }


  }
  hoverLeave(classname: string) {
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
          let img = tempEl.childNodes[0] as HTMLElement;
          let newHeight = this.defaultMaxHeight[img.id].default;

          img.style.maxHeight = newHeight;
          console.log('height on leaving', newHeight, i)
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

  // setD
  ngAfterViewInit(): void {
    setTimeout(()=>{

    }, 9000);
    // console.log(document.getElementById('moha_logo_img').style, '<--- img img ');
    // console.log(
    //   window.getComputedStyle(this.myId.nativeElement, null)
    //     .getPropertyValue("max-height"));

    // console.log(this.myId.nativeElement.getComputedStyle(), 'height');
    // var myElement = angular.element( document.querySelector( '#some-id' ) );

    this.imgHolder = document.getElementById('image-holder');
    // console.log(this.imgHolder);

  }
}
