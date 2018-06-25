import {Component, OnInit} from '@angular/core';
import {fade} from "./animations";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: fade

})
export class AppComponent implements OnInit {
  choice = 2;
  state = 'in';
  counter = 0;
  enableAnimation = false;
  imageSource = '';
  imgSrc1 = 'https://img-0.journaldunet.com/fHxo62BTNKztTbwMO8DHZ06ou10=/1280x/smart/3834e8aee43e4ba58e7e05219842cb7b/ccmcms-jdn/10226772.png';
  imgSrc2 = 'https://phototrend.fr/wp-content/uploads/2016/03/affinity-on-windows.jpg';
  constructor(private router: Router) {

  }
  ngOnInit() {
    // scroll to top
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
    this.imageSource = this.imgSrc1;
  }

  onClick() {
    this.enableAnimation = true;
    this.counter = 0;
    this.toggleState();
  }


  toggleImg() {
    if (this.choice === 1) {
      this.imageSource = this.imgSrc1;
      this.choice = 2;
    } else {
      this.imageSource = this.imgSrc2;
      this.choice = 1;
    }
  }

  onDone($event) {
    if (this.enableAnimation) {
      if (this.counter === 1) {
        this.toggleImg();
      }
      this.toggleState();
    }
  }

  toggleState() {
    if (this.counter < 2) {
      this.state = this.state === 'in' ? 'out' : 'in';
      this.counter++;
    }
  }
}
